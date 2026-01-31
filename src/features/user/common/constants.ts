import { EMPTY } from "@/constants/common";

import { UserFormValues } from "../schemas";

export const COLUMN_KEYS = {
  id: "id",
  email: "email",
  fullName: "fullName",
  role: "role",
  avatar: "avatar",
  phone: "phone",
  emailVerified: "emailVerified",
  levelId: "levelId",
  dailyGoal: "dailyGoal",
  streak: "streak",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
};

export const userDefaultValues: UserFormValues = {
  email: EMPTY.str,
  fullName: EMPTY.str,
  role: "USER",
  avatar: null,
  phone: null,
  levelId: null,
  targetLevel: null,
  dailyGoal: 0,
  streak: 0,
  emailVerified: false,
};
