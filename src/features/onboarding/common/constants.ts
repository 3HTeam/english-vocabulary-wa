import { EMPTY } from "@/constants/common";

export const COLUMN_KEYS = {
  id: "id",
  title: "title",
  imageUrl: "imageUrl",
  description: "description",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const onboardingDefaultValues = {
  title: EMPTY.str,
  imageUrl: EMPTY.str,
  description: EMPTY.str,
  status: true,
};
