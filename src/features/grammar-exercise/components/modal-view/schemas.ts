import { z } from "zod";

export const getSchema = (t: (key: string) => string) =>
  z.object({
    type: z.enum([
      "MULTIPLE_CHOICE",
      "FILL_IN_THE_BLANK",
      "TRUE_FALSE",
      "MATCHING",
    ]),
    question: z.string().min(1, t("field.question_required")),
    answer: z.string().min(1, t("field.answer_required")),
    options: z.object({
      options: z.array(z.string()).min(1, t("field.options_required")),
    }),
    explanation: z.string().min(1, t("field.explanation_required")),
    order: z.number().min(1),
    score: z.number().min(1),
    status: z.boolean(),
    grammarTopicId: z.string().min(1, t("field.grammar_topic_required")),
  });

export type FormValues = z.infer<ReturnType<typeof getSchema>>;
