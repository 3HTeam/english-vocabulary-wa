import { ApiResponse } from "@/types/api";

export type TProfile = {
  user: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    emailVerified: boolean;
  };
};

export type IProfileResponse = ApiResponse<TProfile>;
