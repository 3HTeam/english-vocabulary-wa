import { EMPTY } from "@/constants/common";
import { TopicFormValues } from "../schemas";

export const COLUMN_KEYS = {
  id: "id",
  name: "name",
  status: "status",
  imageUrl: "imageUrl",
  slug: "slug",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const topicDefaultValues: TopicFormValues = {
  name: EMPTY.str,
  imageUrl: EMPTY.str,
  slug: EMPTY.str,
  description: EMPTY.str,
  status: true,
};