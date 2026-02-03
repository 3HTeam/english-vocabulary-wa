export const COLUMN_KEYS = {
  id: "id",
  type: "type",
  question: "question",
  answer: "answer",
  explanation: "explanation",
  order: "order",
  score: "score",
  status: "status",
  grammarTopic: "grammarTopic",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
} as const;

export type ModalMode = "add" | "edit" | "view";
