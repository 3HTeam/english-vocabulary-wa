import { ApiResponse, TMeta } from "../api";

export type TOnboarding = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  status: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TOnboardingPayload = Pick<
  TOnboarding,
  "title" | "imageUrl" | "description" | "status"
>;

export type TOnboardingsResponse = ApiResponse<{
  onboardings: TOnboarding[];
  meta: TMeta;
}>;

export type TOnboardingByIdResponse = ApiResponse<{ onboarding: TOnboarding }>;

export type TCreateOnboardingResponse = ApiResponse<{
  onboarding: TOnboarding;
}>;

export type TUpdateOnboardingResponse = ApiResponse<TOnboarding>;

export type TDeleteOnboardingResponse = ApiResponse<void>;

export type TRestoreOnboardingResponse = ApiResponse<void>;

export type TForceDeleteOnboardingResponse = ApiResponse<void>;
