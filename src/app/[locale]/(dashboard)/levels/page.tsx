"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { LevelView } from "@/features/level";
import { useTranslations } from "@/hooks";

export default function LevelPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("level.levels")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <LevelView />
      </div>
    </>
  );
}
