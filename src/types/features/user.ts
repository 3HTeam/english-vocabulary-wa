import { ApiResponse, TMeta } from "../api";
import { TLevel } from "./level";

export type TUser = {
  id: string;
  email: string;
  fullName: string;
  role: TUserRole;
  avatar: string | null;
  phone: string | null;
  emailVerified: boolean;
  emailVerificationOtp: string;
  emailVerificationExpires: string;
  createdAt: string;
  updatedAt: string;
  levelId: string | null;
  targetLevel: string | null;
  dailyGoal: number;
  streak: number;
  level: TLevel | null;
};

export type TUserRole = "ADMIN" | "USER";

export type TUserPayload = Pick<
  TUser,
  "fullName" | "avatar" | "phone" | "levelId" | "targetLevel" | "dailyGoal"
>;

export type TUsersResponse = ApiResponse<{
  users: TUser[];
  meta: TMeta;
}>;

export type TUserByIdResponse = ApiResponse<{ user: TUser }>;

export type TUpdateUserResponse = ApiResponse<TUser>;
