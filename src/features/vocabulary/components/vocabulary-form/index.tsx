"use client";

import { useEffect, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Book,
  Edit,
  Image as ImageIcon,
  Languages,
  Loader2,
  Plus,
  Save,
  Volume2,
  X,
} from "lucide-react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";

import { useGetTopicQuery } from "@/apis/queries";
import { FileUpload } from "@/components/shared/file-upload";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { EMPTY, MODES } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { useVocabularyStore } from "@/stores";
import { TVocabulary } from "@/types/features/vocabulary";

import { MeaningFieldGroup } from "..";
import {
  getVocabularySchema,
  meaningDefaultValues,
  vocabularyDefaultValues,
  type VocabularyFormValues,
} from "../../schemas";

export type VocabularyFormMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface VocabularyFormProps {
  mode: VocabularyFormMode;
  initialData?: TVocabulary;
  onSubmit?: (values: VocabularyFormValues) => void;
  isSubmitting?: boolean;
}

export function VocabularyForm({
  mode,
  initialData,
  onSubmit: externalOnSubmit,
  isSubmitting: externalIsSubmitting,
}: VocabularyFormProps) {
  const t = useTranslations();
  const { data: topicData } = useGetTopicQuery();
  const router = useRouter();
  const { draft, clearDraft } = useVocabularyStore();

  const isReadOnly = mode === MODES.view;

  const modeConfig: Record<
    VocabularyFormMode,
    { title: string; breadcrumb: string; submitLabel: string }
  > = {
    add: {
      title: t("vocabulary.add_new_vocabulary"),
      breadcrumb: t("vocabulary.add_new_vocabulary"),
      submitLabel: t("common.actions.save"),
    },
    view: {
      title: t("vocabulary.vocabulary_details"),
      breadcrumb: t("vocabulary.vocabulary_details"),
      submitLabel: EMPTY.str,
    },
    edit: {
      title: t("vocabulary.edit_vocabulary"),
      breadcrumb: t("vocabulary.edit_vocabulary"),
      submitLabel: t("common.actions.update"),
    },
  };

  const config = modeConfig[mode];

  const getDefaultValues = (): VocabularyFormValues => {
    if (initialData) {
      return {
        word: initialData.word,
        translation: initialData.translation,
        phonetic: initialData.phonetic,
        status: initialData.status,
        topicId: initialData.topicId,
        imageUrl: initialData.imageUrl || EMPTY.str,
        audioUrlUs: initialData.audioUrlUs || EMPTY.str,
        audioUrlUk: initialData.audioUrlUk || EMPTY.str,
        audioUrlAu: initialData.audioUrlAu || EMPTY.str,
        meanings: initialData.meanings?.map((m) => ({
          partOfSpeech: m.partOfSpeech,
          synonyms: m.synonyms || EMPTY.arr,
          antonyms: m.antonyms || EMPTY.arr,
          definitions:
            m.definitions?.map((d) => ({
              definition: d.definition,
              translation: d.translation || EMPTY.str,
              example: d.example || EMPTY.str,
              exampleTranslation: d.exampleTranslation || EMPTY.str,
            })) || EMPTY.arr,
        })) || [meaningDefaultValues],
      };
    }
    return vocabularyDefaultValues;
  };

  const vocabularySchema = useMemo(() => getVocabularySchema(t), [t]);

  const form = useForm<VocabularyFormValues>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (mode === MODES.add && draft) {
      const filteredMeanings = draft.meanings
        ?.map((meaning) => ({
          ...meaning,
          definitions: meaning.definitions.filter(
            (def) => def.definition && def.definition.trim().length > 0,
          ),
        }))
        .filter((meaning) => meaning.definitions.length > 0);

      if (filteredMeanings && filteredMeanings.length > 0) {
        form.reset({
          ...draft,
          meanings: filteredMeanings,
        } as VocabularyFormValues);
      } else {
        const finalDraft = {
          ...draft,
          meanings: [meaningDefaultValues],
        };
        form.reset(finalDraft as VocabularyFormValues);
      }
      clearDraft();
    }
  }, [draft, form, clearDraft, mode]);

  useEffect(() => {
    if (initialData && (mode === MODES.view || mode === MODES.edit)) {
      const formValues: VocabularyFormValues = {
        word: initialData.word,
        translation: initialData.translation,
        phonetic: initialData.phonetic,
        status: initialData.status,
        topicId: initialData.topicId,
        imageUrl: initialData.imageUrl || EMPTY.str,
        audioUrlUs: initialData.audioUrlUs || EMPTY.str,
        audioUrlUk: initialData.audioUrlUk || EMPTY.str,
        audioUrlAu: initialData.audioUrlAu || EMPTY.str,
        meanings: initialData.meanings?.map((m) => ({
          partOfSpeech: m.partOfSpeech,
          synonyms: m.synonyms || EMPTY.arr,
          antonyms: m.antonyms || EMPTY.arr,
          definitions:
            m.definitions?.map((d) => ({
              definition: d.definition,
              translation: d.translation || EMPTY.str,
              example: d.example || EMPTY.str,
              exampleTranslation: d.exampleTranslation || EMPTY.str,
            })) || EMPTY.arr,
        })) || [meaningDefaultValues],
      };
      form.reset(formValues);
    }
  }, [initialData, mode, form]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting: formIsSubmitting },
  } = form;

  const isSubmitting = externalIsSubmitting ?? formIsSubmitting;

  const {
    fields: meaningFields,
    append: appendMeaning,
    remove: removeMeaning,
  } = useFieldArray({
    control,
    name: "meanings",
  });

  const handleFormSubmit: SubmitHandler<VocabularyFormValues> = async (
    values,
  ) => {
    if (externalOnSubmit) {
      externalOnSubmit(values);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <BreadcrumbLink asChild>
                <Link href={ROUTE_PATH.admin.vocabularies}>
                  {t("vocabulary.vocabularies")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{config.breadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>

          <div className="flex gap-2">
            {mode === MODES.view ? (
              <Button
                type="button"
                onClick={() =>
                  router.push(
                    `${ROUTE_PATH.admin.vocabularies}/${initialData?.id}/edit`,
                  )
                }
                className="cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                {t("common.actions.edit")}
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(ROUTE_PATH.admin.vocabularies)}
                  className="cursor-pointer"
                >
                  {t("common.actions.cancel")}
                </Button>
                <Button
                  onClick={handleSubmit(handleFormSubmit)}
                  disabled={isSubmitting}
                  className="cursor-pointer min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("common.actions.saving")}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {config.submitLabel}
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                {t("vocabulary.sections.basic_info")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="word"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("field.word")} {t("common.form.required")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.word_placeholder")}
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
                  name="phonetic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("field.phonetic")} {t("common.form.required")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.phonetic_placeholder")}
                          disabled={isReadOnly}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="translation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("field.translation")} {t("common.form.required")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.translation_placeholder")}
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
                  name="topicId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("field.topic")} {t("common.form.required")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isReadOnly}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[50%]">
                            <SelectValue
                              placeholder={t("field.topic_placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topicData?.data?.topics.map((topic) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t("field.status")}</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {field.value
                          ? t("common.status.active")
                          : t("common.status.inactive")}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isReadOnly}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  {t("vocabulary.sections.audio")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="audioUrlUs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-muted px-1.5 py-0.5 rounded">
                          US
                        </span>
                        {t("vocabulary.audio.audio_us")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.audio_placeholder")}
                          disabled={isReadOnly}
                          {...field}
                          value={field.value || EMPTY.str}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="audioUrlUk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-muted px-1.5 py-0.5 rounded">
                          UK
                        </span>
                        {t("vocabulary.audio.audio_uk")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.audio_placeholder")}
                          disabled={isReadOnly}
                          {...field}
                          value={field.value || EMPTY.str}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="audioUrlAu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-muted px-1.5 py-0.5 rounded">
                          AU
                        </span>
                        {t("vocabulary.audio.audio_au")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("field.audio_placeholder")}
                          disabled={isReadOnly}
                          {...field}
                          value={field.value || EMPTY.str}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  {t("vocabulary.sections.image")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {field.value ? (
                          <div className="relative group">
                            <div className="aspect-video w-full rounded-lg border overflow-hidden bg-muted">
                              <img
                                src={field.value}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="default"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7"
                                onClick={() => field.onChange(EMPTY.str)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          !isReadOnly && (
                            <FileUpload
                              onUploadSuccess={(url) => {
                                field.onChange(url);
                              }}
                              onUploadError={EMPTY.fn}
                              accept="image/*"
                              maxSize={1024 * 1024}
                              multiple={false}
                            />
                          )
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Meanings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                {t("vocabulary.sections.meanings")}
              </h3>
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendMeaning(meaningDefaultValues)}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t("vocabulary.meaning.add")}
                </Button>
              )}
            </div>

            {meaningFields.map((meaningField, meaningIndex) => (
              <MeaningFieldGroup
                key={meaningField.id}
                control={control}
                meaningIndex={meaningIndex}
                onRemove={() => removeMeaning(meaningIndex)}
                canRemove={meaningFields.length > 1}
                isReadOnly={isReadOnly}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
}
