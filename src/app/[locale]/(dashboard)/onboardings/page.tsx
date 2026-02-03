"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import OnboardingView from "@/features/onboarding";
import { useTranslations } from "@/hooks";

export default function OnboardingPage() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("onboarding.onboardings")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <OnboardingView />
      </div>
    </>
  );
}
