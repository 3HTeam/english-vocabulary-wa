import z from "zod";

const definitionSchema = z.object({
  definition: z.string().min(1, "Định nghĩa là bắt buộc"),
  translation: z.string().optional(),
  example: z.string().nullable().optional(),
  exampleTranslation: z.string().nullable().optional(),
});

const meaningSchema = z.object({
  partOfSpeech: z.string().min(1, "Từ loại là bắt buộc"),
  synonyms: z.array(z.string()).optional(),
  antonyms: z.array(z.string()).optional(),
  definitions: z.array(definitionSchema).min(1, "Cần ít nhất 1 định nghĩa"),
});

export const vocabularySchema = z.object({
  word: z.string().min(1, "Từ vựng là bắt buộc"),
  translation: z.string().min(1, "Nghĩa từ vựng là bắt buộc"),
  phonetic: z.string().min(1, "Phiên âm là bắt buộc"),
  status: z.boolean(),
  audioUrlUs: z
    .string()
    .url("URL âm thanh US không hợp lệ")
    .optional()
    .or(z.literal("")),
  audioUrlUk: z
    .string()
    .url("URL âm thanh UK không hợp lệ")
    .optional()
    .or(z.literal("")),
  audioUrlAu: z
    .string()
    .url("URL âm thanh AU không hợp lệ")
    .optional()
    .or(z.literal("")),
  imageUrl: z.string().url("URL ảnh không hợp lệ").optional().or(z.literal("")),
  topicId: z.string().min(1, "Chủ đề từ vựng là bắt buộc"),
  meanings: z.array(meaningSchema).min(1, "Cần ít nhất 1 nghĩa"),
});

export type DefinitionFormValues = z.infer<typeof definitionSchema>;
export type MeaningFormValues = z.infer<typeof meaningSchema>;
export type VocabularyFormValues = z.infer<typeof vocabularySchema>;

export const definitionDefaultValues: DefinitionFormValues = {
  definition: "",
  translation: "",
  example: "",
  exampleTranslation: "",
};

export const meaningDefaultValues: MeaningFormValues = {
  partOfSpeech: "",
  synonyms: [],
  antonyms: [],
  definitions: [definitionDefaultValues],
};

export const vocabularyDefaultValues: VocabularyFormValues = {
  word: "",
  translation: "",
  phonetic: "",
  status: true,
  audioUrlUs: "",
  audioUrlUk: "",
  audioUrlAu: "",
  imageUrl: "",
  topicId: "",
  meanings: [meaningDefaultValues],
};
