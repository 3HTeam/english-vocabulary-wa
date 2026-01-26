import { ApiResponse, TMeta } from "@/types/api";

export type TTopic = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
  status: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TTopicsResponse = ApiResponse<{
  topics: TTopic[];
  meta: TMeta;
}>;

export type TTopicByIdResponse = ApiResponse<{
  topic: TTopic;
}>;

export type TTopicPayload = Pick<
  TTopic,
  "name" | "imageUrl" | "slug" | "description" | "status"
>;

export type TUpdateTopicResponse = ApiResponse<TTopic>;

export type TDeleteTopicResponse = ApiResponse<void>;

export type TRestoreTopicResponse = ApiResponse<void>;

export type TForceDeleteTopicResponse = ApiResponse<void>;

export type TCreateTopicResponse = ApiResponse<TTopic>;
