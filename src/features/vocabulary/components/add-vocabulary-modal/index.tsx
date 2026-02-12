"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { EMPTY, MODES } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { useVocabularyStore } from "@/stores";
import { getDictionaryApiUrl } from "@/utils/api";

import { type VocabularyFormValues } from "../../schemas";

export const AddVocabularyModal = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formSchema = useMemo(
    () =>
      z.object({
        word: z.string().min(1, t("field.word_required")),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: EMPTY.str,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const [dictionaryResponse, imageResponse] = await Promise.all([
        fetch(getDictionaryApiUrl(values.word)),
        fetch(`/api/freepik?term=${encodeURIComponent(values.word)}`),
      ]);

      if (!dictionaryResponse.ok) {
        throw new Error(t("vocabulary.vocabulary_not_found"));
      }

      const data = await dictionaryResponse.json();
      const entry = data[0];

      if (!entry) {
        throw new Error(t("vocabulary.no_data_for_this_vocabulary"));
      }

      let imageUrl = EMPTY.str;
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.data?.[0]?.image?.source?.url || EMPTY.str;
      }

      const mappedData: Partial<VocabularyFormValues> = {
        word: entry.word,
        phonetic:
          entry.phonetic ||
          entry.phonetics?.find((p: any) => p.text)?.text ||
          EMPTY.str,
        audioUrlUs:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-us.mp3"))
            ?.audio || EMPTY.str,
        audioUrlUk:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-uk.mp3"))
            ?.audio || EMPTY.str,
        audioUrlAu:
          entry.phonetics?.find((p: any) => p.audio?.endsWith("-au.mp3"))
            ?.audio || EMPTY.str,
        imageUrl,
        meanings:
          entry.meanings?.map((m: any) => ({
            partOfSpeech: m.partOfSpeech,
            synonyms: m.synonyms || EMPTY.arr,
            antonyms: m.antonyms || EMPTY.arr,
            definitions:
              m.definitions?.map((d: any) => ({
                definition: d.definition,
                translation: EMPTY.str,
                example: d.example || EMPTY.str,
                exampleTranslation: EMPTY.str,
              })) || EMPTY.arr,
          })) || EMPTY.arr,
      };

      useVocabularyStore.getState().setDraft(mappedData);

      toast.success(t("vocabulary.vocabulary_found_redirect"));
      setOpen(false);
      router.push(`${ROUTE_PATH.admin.vocabularies}/${MODES.add}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("vocabulary.vocabulary_not_found"),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          {t("vocabulary.add_new_vocabulary")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("vocabulary.add_new_vocabulary")}</DialogTitle>
          <DialogDescription>
            {t("vocabulary.add_new_vocabulary_desc")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("field.word")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("vocabulary.enter_vocabulary_eg")}
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
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  router.push(`${ROUTE_PATH.admin.vocabularies}/add`);
                }}
              >
                {t("vocabulary.create_manually")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("vocabulary.search_and_auto_fill")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
