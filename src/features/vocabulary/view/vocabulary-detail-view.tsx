"use client";

import { useGetVocabularyByIdQuery } from "@/apis";
import { VocabularyForm } from "../components/vocabulary-form";
import { Skeleton } from "@/components/ui/skeleton";

interface VocabularyDetailViewProps {
  id: string;
}

export default function VocabularyDetailView({
  id,
}: VocabularyDetailViewProps) {
  const { data, isLoading, error } = useGetVocabularyByIdQuery(id);

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

  return <VocabularyForm mode="view" initialData={data.data.vocabulary} />;
}
