import { EMPTY, MODES } from "@/constants/common";

import { ModalMode } from "../../common";

export const defaultValues = {
  type: "MULTIPLE_CHOICE" as const,
  question: EMPTY.str,
  answer: EMPTY.str,
  options: {
    options: [EMPTY.str],
  },
  explanation: EMPTY.str,
  order: 1,
  score: 10,
  status: true,
  grammarTopicId: EMPTY.str,
};

export const MODAL_CONFIG: Record<
  ModalMode,
  (t: (key: string) => string) => { title: string; description: string }
> = {
  [MODES.add]: (t) => ({
    title: t("grammar_exercise.add_grammar_exercise"),
    description: t("grammar_exercise.add_grammar_exercise_desc"),
  }),
  [MODES.edit]: (t) => ({
    title: t("grammar_exercise.edit_grammar_exercise"),
    description: t("grammar_exercise.edit_grammar_exercise_desc"),
  }),
  [MODES.view]: (t) => ({
    title: t("grammar_exercise.grammar_exercise_details"),
    description: t("grammar_exercise.grammar_exercise_details_desc"),
  }),
};
