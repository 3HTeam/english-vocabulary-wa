import { EMPTY } from "@/constants/common";

import { LevelFormValues } from "../schemas";

export const COLUMN_KEYS = {
  id: "id",
  code: "code",
  name: "name",
  status: "status",
  order: "order",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const levelDefaultValues: LevelFormValues = {
  code: EMPTY.str,
  name: EMPTY.str,
  description: EMPTY.str,
  order: 0,
  status: true,
};
