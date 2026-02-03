import { ApiResponse, TMeta } from "@/types/api";

export type TGrammarTopic = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
  content: string;
  status: boolean;
  order: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isDeleted: boolean;
  deletedAt: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  levelId: string;
  grammarCategoryId: string;
  level?: {
    id: string;
    code: string;
    name: string;
    description: string;
    order: number;
    status: boolean;
  };
  grammarCategory?: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    description: string;
    status: boolean;
  };
};

export type TGrammarTopicsResponse = ApiResponse<{
  grammarTopics: TGrammarTopic[];
  meta: TMeta;
}>;

export type TGrammarTopicByIdResponse = ApiResponse<{
  grammarTopic: TGrammarTopic;
}>;

export type TGrammarTopicPayload = {
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
  content: string;
  status: boolean;
  order: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  levelId: string;
  grammarCategoryId: string;
};

export type TUpdateGrammarTopicResponse = ApiResponse<TGrammarTopic>;
export type TDeleteGrammarTopicResponse = ApiResponse<void>;
export type TRestoreGrammarTopicResponse = ApiResponse<void>;
export type TForceDeleteGrammarTopicResponse = ApiResponse<void>;
export type TCreateGrammarTopicResponse = ApiResponse<TGrammarTopic>;
