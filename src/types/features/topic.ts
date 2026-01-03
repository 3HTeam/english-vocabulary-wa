import { ApiResponse } from "../api/base";
import { TMeta } from "../api/meta";

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

export type TTopicResponse = ApiResponse<{
  topics: TTopic[];
  meta: TMeta;
}>;

export type TTopicByIdResponse = ApiResponse<{
  topic: TTopic;
}>;

export type TUpdateTopicResponse = ApiResponse<TTopic>;

export type TDeleteTopicResponse = ApiResponse<TTopic>;

export type TTopicPayload = {
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
  status: boolean;
};

export type TCreateTopicResponse = ApiResponse<TTopic>;
