"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useCreateVocabularyMutation } from "@/apis";
import { VocabularyForm } from "../components/vocabulary-form";
import { type VocabularyFormValues } from "../schemas/vocabulary.schema";

export default function AddVocabularyView() {
  const { mutate: createVocabularyMutation, isPending } =
    useCreateVocabularyMutation();
  const router = useRouter();

  const handleSubmit = (values: VocabularyFormValues) => {
    const payload = {
      ...values,
      imageUrl: values.imageUrl || "",
      audioUrlUs: values.audioUrlUs || "",
      audioUrlUk: values.audioUrlUk || "",
      audioUrlAu: values.audioUrlAu || "",
      meanings: values.meanings.map((m) => ({
        ...m,
        synonyms: m.synonyms || [],
        antonyms: m.antonyms || [],
        definitions: m.definitions.map((d) => ({
          ...d,
          translation: d.translation || "",
          example: d.example || "",
          exampleTranslation: d.exampleTranslation || "",
        })),
      })),
    };

    createVocabularyMutation(payload, {
      onSuccess: () => {
        toast.success("Tạo từ vựng thành công!");
        router.push("/vocabularies");
      },
      onError: () => {
        toast.error("Tạo từ vựng thất bại, vui lòng thử lại.");
      },
    });
  };

  return (
    <VocabularyForm
      mode="add"
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
