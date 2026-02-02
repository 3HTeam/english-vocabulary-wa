import { EMPTY } from "@/constants/common";

export const COLUMN_KEYS = {
  id: "id",
  name: "name",
  status: "status",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const moduleDefaultValues = {
  name: EMPTY.str,
  status: true,
  description: EMPTY.str,
};
