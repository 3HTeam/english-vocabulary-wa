"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { AddVocabularyView } from "@/features/vocabulary/components";
import { useTranslations } from "@/hooks";

export default function AddVocabularyPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder */}
      <MobileViewPlaceholder title={t("vocabulary.add_new_vocabulary")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <AddVocabularyView />
      </div>
    </>
  );
}
