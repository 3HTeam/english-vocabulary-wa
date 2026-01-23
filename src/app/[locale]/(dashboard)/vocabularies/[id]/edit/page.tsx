"use client";

import { useParams } from "next/navigation";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { EditVocabularyView } from "@/features/vocabulary/components";
import { useTranslations } from "@/hooks";

export default function EditVocabularyPage() {
  const t = useTranslations();
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      {/* Mobile view placeholder */}
      <MobileViewPlaceholder title={t("vocabulary.edit_vocabulary")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <EditVocabularyView id={id} />
      </div>
    </>
  );
}
