import { EMPTY, MODES } from "@/constants/common";

import { ModalMode } from "../../common";

export const defaultValues = {
  name: EMPTY.str,
  slug: EMPTY.str,
  imageUrl: EMPTY.str,
  description: EMPTY.str,
  status: true,
};

export const MODAL_CONFIG: Record<
  ModalMode,
  (t: (key: string) => string) => { title: string; description: string }
> = {
  [MODES.add]: (t) => ({
    title: t("grammar_category.add_grammar_category"),
    description: t("grammar_category.add_grammar_category_desc"),
  }),
  [MODES.edit]: (t) => ({
    title: t("grammar_category.edit_grammar_category"),
    description: t("grammar_category.edit_grammar_category_desc"),
  }),
  [MODES.view]: (t) => ({
    title: t("grammar_category.grammar_category_details"),
    description: t("grammar_category.grammar_category_details_desc"),
  }),
};
