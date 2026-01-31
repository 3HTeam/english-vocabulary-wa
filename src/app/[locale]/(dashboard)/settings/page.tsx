"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { SettingView } from "@/features/setting";
import { useTranslations } from "@/hooks";

export default function SettingsPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("setting.settings")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <SettingView />
      </div>
    </>
  );
}
