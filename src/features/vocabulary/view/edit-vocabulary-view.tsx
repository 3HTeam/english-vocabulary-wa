"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useGetVocabularyByIdQuery, useUpdateVocabularyMutation } from "@/apis";
import { VocabularyForm } from "../components/vocabulary-form";
import { type VocabularyFormValues } from "../schemas/vocabulary.schema";
import { Skeleton } from "@/components/ui/skeleton";

interface EditVocabularyViewProps {
  id: string;
}

export default function EditVocabularyView({ id }: EditVocabularyViewProps) {
  const { data, isLoading, error } = useGetVocabularyByIdQuery(id);
  const { mutate: updateVocabularyMutation, isPending } =
    useUpdateVocabularyMutation();
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

    updateVocabularyMutation(
      { id, payload },
      {
        onSuccess: () => {
          toast.success("Cập nhật từ vựng thành công!");
          router.push("/vocabularies");
        },
        onError: () => {
          toast.error("Cập nhật từ vựng thất bại, vui lòng thử lại.");
        },
      }
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
        <p className="text-muted-foreground">
          Không tìm thấy từ vựng hoặc đã xảy ra lỗi.
        </p>
      </div>
    );
  }

  return (
    <VocabularyForm
      mode="edit"
      initialData={data.data.vocabulary}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
