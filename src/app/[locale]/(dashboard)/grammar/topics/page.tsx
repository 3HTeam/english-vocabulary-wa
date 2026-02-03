"use client";

import { MobileViewPlaceholder } from "@/components/shared/mobile-view-placeholder";
import { GrammarTopicView } from "@/features/grammar-topic";
import { useTranslations } from "@/hooks";

export default function GrammarTopicsPage() {
  const t = useTranslations();

  return (
    <>
      {/* Mobile view placeholder */}
      <MobileViewPlaceholder title={t("grammar_topic.grammar_topics")} />

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <GrammarTopicView />
      </div>
    </>
  );
}
