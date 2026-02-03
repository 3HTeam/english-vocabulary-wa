"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import PopupView from "@/features/popup";
import { useTranslations } from "@/hooks";

export default function PopupPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("popup.popups")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <PopupView />
      </div>
    </>
  );
}
