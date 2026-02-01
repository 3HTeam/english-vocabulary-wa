"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { UserView } from "@/features/user";
import { useTranslations } from "@/hooks";

export default function CategoriesLayout() {
  const t = useTranslations();
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <MobileViewPlaceholder title={t("grammar_category.grammar_categories")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <UserView />
      </div>
    </>
  );
}
