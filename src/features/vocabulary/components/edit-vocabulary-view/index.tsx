"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useGetVocabularyByIdQuery,
  useUpdateVocabularyMutation,
} from "@/apis/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "@/hooks";
import { ROUTE_PATH } from "@/constants/routes";
import { EMPTY, MODES } from "@/constants/common";
import { VocabularyForm } from "..";
import { type VocabularyFormValues } from "../../schemas";

interface EditVocabularyViewProps {
  id: string;
}

export function EditVocabularyView({ id }: EditVocabularyViewProps) {
  const t = useTranslations();
  const { data, isLoading, error } = useGetVocabularyByIdQuery(id);
  const { mutate: updateVocabularyMutation, isPending } =
    useUpdateVocabularyMutation();
  const router = useRouter();

  const handleSubmit = (values: VocabularyFormValues) => {
    const payload = {
      ...values,
      imageUrl: values.imageUrl || EMPTY.str,
      audioUrlUs: values.audioUrlUs || EMPTY.str,
      audioUrlUk: values.audioUrlUk || EMPTY.str,
      audioUrlAu: values.audioUrlAu || EMPTY.str,
      meanings: values.meanings.map((m) => ({
        ...m,
        synonyms: m.synonyms || EMPTY.arr,
        antonyms: m.antonyms || EMPTY.arr,
        definitions: m.definitions.map((d) => ({
          ...d,
          translation: d.translation || EMPTY.str,
          example: d.example || EMPTY.str,
          exampleTranslation: d.exampleTranslation || EMPTY.str,
        })),
      })),
    };

    updateVocabularyMutation(
      { id, payload },
      {
        onSuccess: () => {
          toast.success(
            t("common.toast.update_success", { item: t("vocabulary.name") }),
          );
          router.push(ROUTE_PATH.admin.vocabularies);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              t("common.toast.update_error", { item: t("vocabulary.name") }),
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error || !data?.data?.vocabulary) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">{t("common.error.not_found")}</p>
      </div>
    );
  }

  return (
    <VocabularyForm
      mode={MODES.edit}
      initialData={data.data.vocabulary}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
