import { z } from "zod";

export const topicSchema = z.object({
  name: z.string().min(1, "Tên chủ đề là bắt buộc"),
  imageUrl: z.string().min(1, "Ảnh là bắt buộc").url("URL ảnh không hợp lệ"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  description: z.string().nullable().optional(),
  status: z.boolean(),
});

export type TopicFormValues = z.infer<typeof topicSchema>;

export const topicDefaultValues: TopicFormValues = {
  name: "",
  imageUrl: "",
  slug: "",
  description: "",
  status: true,
};
