"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VocabularyFormValues } from "../schemas/vocabulary.schema";
import { useVocabularyStore } from "@/stores";
import { useTranslations } from "@/hooks";

const formSchema = z.object({
  word: z.string().min(1, "Vui lòng nhập từ vựng"),
});

export const AddVocabularyModal = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const [dictionaryResponse, imageResponse] = await Promise.all([
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${values.word}`),
        fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            values.word
          )}&per_page=1&client_id=${
            process.env.NEXT_PUBLIC_ACCESS_KEY_UNSPLASH
          }`
        ),
      ]);

      if (!dictionaryResponse.ok) {
        throw new Error(t("vocabulary.not_found"));
      }

      const data = await dictionaryResponse.json();
      const entry = data[0];

      if (!entry) {
        throw new Error(t("vocabulary.no_data"));
      }

      let imageUrl = "";
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.results?.[0]?.urls?.regular || "";
      }

      const mappedData: Partial<VocabularyFormValues> = {
        word: entry.word,
        phonetic:
          entry.phonetic ||
          entry.phonetics?.find((p: any) => p.text)?.text ||
          "",
        audioUrlUs:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-us.mp3"))
            ?.audio || "",
        audioUrlUk:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-uk.mp3"))
            ?.audio || "",
        audioUrlAu:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-au.mp3"))
            ?.audio || "",
        imageUrl,
        meanings:
          entry.meanings?.map((m: any) => ({
            partOfSpeech: m.partOfSpeech,
            synonyms: m.synonyms || [],
            antonyms: m.antonyms || [],
            definitions:
              m.definitions?.map((d: any) => ({
                definition: d.definition,
                translation: "",
                example: d.example || "",
                exampleTranslation: "",
              })) || [],
          })) || [],
      };

      useVocabularyStore.getState().setDraft(mappedData);

      toast.success(t("vocabulary.found_redirect"));
      setOpen(false);
      router.push("/vocabularies/add");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("vocabulary.error")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("vocabulary.add_title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("vocabulary.add_title")}</DialogTitle>
          <DialogDescription>{t("vocabulary.add_desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("vocabulary.form.word")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("vocabulary.word_input_placeholder")}
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  router.push("/vocabularies/add");
                }}
              >
                {t("vocabulary.manual_create")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("vocabulary.auto_fill")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
