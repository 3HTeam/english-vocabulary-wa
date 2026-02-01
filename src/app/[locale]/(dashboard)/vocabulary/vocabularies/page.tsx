"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { VocabularyView } from "@/features/vocabulary";
import { useTranslations } from "@/hooks";

export default function VocabularyPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("vocabulary.vocabularies")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <VocabularyView />
      </div>
    </>
  );
}
