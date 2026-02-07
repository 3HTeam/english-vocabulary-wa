"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useCreateVocabularyMutation } from "@/apis/hooks";
import { EMPTY, MODES } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";

import { VocabularyForm } from "..";
import { type VocabularyFormValues } from "../../schemas";

export function AddVocabularyView() {
  const t = useTranslations();
  const { mutate: createVocabularyMutation, isPending } =
    useCreateVocabularyMutation();
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

    createVocabularyMutation(payload, {
      onSuccess: () => {
        toast.success(
          t("common.toast.create_success", { item: t("vocabulary.name") }),
        );
        router.push(ROUTE_PATH.admin.vocabularies);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            t("common.toast.create_error", { item: t("vocabulary.name") }),
        );
      },
    });
  };

  return (
    <VocabularyForm
      mode={MODES.add}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
