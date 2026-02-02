import { ApiResponse, TMeta } from "../api";

export type TModule = {
  id: string;
  name: string;
  description: string;
  status: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TModulePayload = Pick<TModule, "name" | "description" | "status">;

export type TModulesResponse = ApiResponse<{ modules: TModule[]; meta: TMeta }>;

export type TModuleByIdResponse = ApiResponse<{ module: TModule }>;

export type TUpdateModuleResponse = ApiResponse<TModule>;

export type TDeleteModuleResponse = ApiResponse<void>;

export type TRestoreModuleResponse = ApiResponse<void>;

export type TForceDeleteModuleResponse = ApiResponse<void>;

export type TCreateModuleResponse = ApiResponse<TModule>;
