import { ApiResponse, TMeta } from "../api";

export type TBanner = {
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
  moduleId: string;
};

export type TBannerPayload = Pick<
  TBanner,
  "title" | "imageUrl" | "description" | "status" | "moduleId"
>;

export type TBannersResponse = ApiResponse<{
  banners: TBanner[];
  meta: TMeta;
}>;

export type TBannerByIdResponse = ApiResponse<{
  banner: TBanner;
}>;

export type TCreateBannerResponse = ApiResponse<{
  banner: TBanner;
}>;

export type TUpdateBannerResponse = ApiResponse<TBanner>;

export type TDeleteBannerResponse = ApiResponse<void>;

export type TRestoreBannerResponse = ApiResponse<void>;

export type TForceDeleteBannerResponse = ApiResponse<void>;
