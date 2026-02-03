import { ApiResponse, TMeta } from "@/types/api";

export type TGrammarCategory = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
  status: boolean;
  isDeleted: boolean;
  deletedAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

};

export type TGrammarCategoriesResponse = ApiResponse<{
  grammarCategories: TGrammarCategory[];
  meta: TMeta;
}>;

export type TGrammarCategoryByIdResponse = ApiResponse<{
  grammarCategory: TGrammarCategory;
}>;

export type TGrammarCategoryPayload = Pick<
  TGrammarCategory,
  "name" | "imageUrl" | "slug" | "description" | "status"
>;

export type TUpdateGrammarCategoryResponse = ApiResponse<TGrammarCategory>;

export type TDeleteGrammarCategoryResponse = ApiResponse<void>;

export type TRestoreGrammarCategoryResponse = ApiResponse<void>;    
export type TForceDeleteGrammarCategoryResponse = ApiResponse<void>;

export type TCreateGrammarCategoryResponse = ApiResponse<TGrammarCategory>;
