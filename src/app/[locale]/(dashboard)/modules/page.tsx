"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import ModuleView from "@/features/module";
import { useTranslations } from "@/hooks";

export default function TopicPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("module.modules")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <ModuleView />
      </div>
    </>
  );
}
