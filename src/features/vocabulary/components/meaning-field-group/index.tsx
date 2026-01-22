"use client";

import { useFieldArray, type Control } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks";
import { EMPTY } from "@/constants/common";
import {
  definitionDefaultValues,
  type VocabularyFormValues,
} from "../../schemas";

const partOfSpeechOptions = [
  { value: "noun", label: "Noun (Danh từ)" },
  { value: "verb", label: "Verb (Động từ)" },
  { value: "adjective", label: "Adjective (Tính từ)" },
  { value: "adverb", label: "Adverb (Trạng từ)" },
  { value: "pronoun", label: "Pronoun (Đại từ)" },
  { value: "preposition", label: "Preposition (Giới từ)" },
  { value: "conjunction", label: "Conjunction (Liên từ)" },
  { value: "interjection", label: "Interjection (Thán từ)" },
  { value: "determiner", label: "Determiner (Từ xác định)" },
  { value: "article", label: "Article (Mạo từ)" },
  { value: "numeral", label: "Numeral (Số từ)" },
  { value: "phrasal_verb", label: "Phrasal Verb (Cụm động từ)" },
  { value: "idiom", label: "Idiom (Thành ngữ)" },
  { value: "phrase", label: "Phrase (Cụm từ)" },
];

interface MeaningFieldGroupProps {
  control: Control<VocabularyFormValues>;
  meaningIndex: number;
  onRemove: () => void;
  canRemove: boolean;
  isReadOnly?: boolean;
}

export function MeaningFieldGroup({
  control,
  meaningIndex,
  onRemove,
  canRemove,
  isReadOnly = false,
}: MeaningFieldGroupProps) {
  const t = useTranslations();
  const {
    fields: definitionFields,
    append: appendDefinition,
    remove: removeDefinition,
  } = useFieldArray({
    control,
    name: `meanings.${meaningIndex}.definitions`,
  });

  return (
    <Card className="border-l-4 border-l-primary/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Badge variant="outline">#{meaningIndex + 1}</Badge>
            {t("vocabulary.meaning.info")}
          </CardTitle>
          {canRemove && !isReadOnly && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-destructive h-8 w-8 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name={`meanings.${meaningIndex}.partOfSpeech`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("field.part_of_speech")}{" "}
                  {t("common.form.required")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isReadOnly}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue
                        placeholder={t(
                          "field.part_of_speech_placeholder",
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {partOfSpeechOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`meanings.${meaningIndex}.synonyms`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("field.synonyms")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("field.synonyms_placeholder")}
                    value={field.value?.join(", ") || EMPTY.str}
                    disabled={isReadOnly}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value
                          ? value.split(",").map((s: string) => s.trim())
                          : [],
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`meanings.${meaningIndex}.antonyms`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("field.antonyms")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("field.antonyms_placeholder")}
                    value={field.value?.join(", ") || EMPTY.str}
                    disabled={isReadOnly}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value
                          ? value.split(",").map((s: string) => s.trim())
                          : [],
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">
              {t("vocabulary.definition.list")}
            </h4>
            {!isReadOnly && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => appendDefinition(definitionDefaultValues)}
                className="cursor-pointer h-8"
              >
                <Plus className="h-3 w-3 mr-1" />
                {t("vocabulary.definition.add")}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {definitionFields.map((defField, defIndex) => (
              <div
                key={defField.id}
                className="relative grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="absolute top-2 right-2">
                  {definitionFields.length > 1 && !isReadOnly && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDefinition(defIndex)}
                      className="text-muted-foreground hover:text-destructive h-6 w-6"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`meanings.${meaningIndex}.definitions.${defIndex}.definition`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase text-muted-foreground">
                          {t("field.definition")} (EN){" "}
                          {t("common.form.required")}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t(
                              "field.definition_placeholder",
                            )}
                            className="resize-none min-h-[60px]"
                            disabled={isReadOnly}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`meanings.${meaningIndex}.definitions.${defIndex}.translation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase text-muted-foreground">
                          {t("field.translation")} (VI){" "}
                          {t("common.form.required")}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t(
                              "field.translation_placeholder",
                            )}
                            className="resize-none min-h-[60px]"
                            disabled={isReadOnly}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`meanings.${meaningIndex}.definitions.${defIndex}.example`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase text-muted-foreground">
                          {t("field.example")} (EN)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t(
                              "field.example_placeholder",
                            )}
                            className="resize-none min-h-[60px]"
                            value={field.value || EMPTY.str}
                            onChange={field.onChange}
                            disabled={isReadOnly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`meanings.${meaningIndex}.definitions.${defIndex}.exampleTranslation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase text-muted-foreground">
                          {t("field.example_translation")} (VI)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t(
                              "field.example_translation_placeholder",
                            )}
                            className="resize-none min-h-[60px]"
                            value={field.value || EMPTY.str}
                            onChange={field.onChange}
                            disabled={isReadOnly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
