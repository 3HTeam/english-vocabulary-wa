import { ApiResponse, TMeta } from "../api";

export type TPopup = {
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

export type TPopupPayload = Pick<
  TPopup,
  "title" | "imageUrl" | "description" | "status" | "moduleId"
>;

export type TPopupsResponse = ApiResponse<{
  popups: TPopup[];
  meta: TMeta;
}>;

export type TPopupByIdResponse = ApiResponse<{ popup: TPopup }>;

export type TCreatePopupResponse = ApiResponse<{
  popup: TPopup;
}>;

export type TUpdatePopupResponse = ApiResponse<TPopup>;

export type TDeletePopupResponse = ApiResponse<void>;

export type TRestorePopupResponse = ApiResponse<void>;

export type TForceDeletePopupResponse = ApiResponse<void>;
