"use client";

import { useGetVocabularyByIdQuery } from "@/apis/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import { VocabularyForm } from "..";

interface VocabularyDetailViewProps {
  id: string;
}

export function VocabularyDetailView({ id }: VocabularyDetailViewProps) {
  const t = useTranslations();
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
        <p className="text-muted-foreground">{t("common.error.not_found")}</p>
      </div>
    );
  }

  return (
    <VocabularyForm mode={MODES.view} initialData={data.data.vocabulary} />
  );
}
