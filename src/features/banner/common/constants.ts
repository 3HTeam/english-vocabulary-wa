import { EMPTY } from "@/constants/common";

export const COLUMN_KEYS = {
  id: "id",
  title: "title",
  imageUrl: "imageUrl",
  description: "description",
  status: "status",
  moduleId: "moduleId",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const bannerDefaultValues = {
  title: EMPTY.str,
  imageUrl: EMPTY.str,
  description: EMPTY.str,
  status: true,
  moduleId: EMPTY.str,
};
