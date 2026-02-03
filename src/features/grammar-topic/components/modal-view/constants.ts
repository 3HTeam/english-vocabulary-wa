import { EMPTY, MODES } from "@/constants/common";

import { ModalMode } from "../../common";

export const defaultValues = {
  title: EMPTY.str,
  slug: EMPTY.str,
  imageUrl: EMPTY.str,
  description: EMPTY.str,
  content: EMPTY.str,
  status: true,
  order: 1,
  difficulty: "BEGINNER" as const,
  levelId: EMPTY.str,
  grammarCategoryId: EMPTY.str,
};

export const MODAL_CONFIG: Record<
  ModalMode,
  (t: (key: string) => string) => { title: string; description: string }
> = {
  [MODES.add]: (t) => ({
    title: t("grammar_topic.add_grammar_topic"),
    description: t("grammar_topic.add_grammar_topic_desc"),
  }),
  [MODES.edit]: (t) => ({
    title: t("grammar_topic.edit_grammar_topic"),
    description: t("grammar_topic.edit_grammar_topic_desc"),
  }),
  [MODES.view]: (t) => ({
    title: t("grammar_topic.grammar_topic_details"),
    description: t("grammar_topic.grammar_topic_details_desc"),
  }),
};
