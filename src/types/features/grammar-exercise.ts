import { ApiResponse, TMeta } from "@/types/api";

export type TGrammarExerciseType =
  | "MULTIPLE_CHOICE"
  | "FILL_IN_THE_BLANK"
  | "TRUE_FALSE"
  | "MATCHING";

export type TGrammarExercise = {
  id: string;
  type: TGrammarExerciseType;
  question: string;
  answer: string;
  options: {
    options: string[];
  };
  explanation: string;
  order: number;
  score: number;
  isDeleted: boolean;
  deletedAt: string | null;
  status: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  grammarTopicId: string;
  grammarTopic?: {
    id: string;
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
};

export type TGrammarExercisesResponse = ApiResponse<{
  grammarExercises: TGrammarExercise[];
  meta: TMeta;
}>;

export type TGrammarExerciseByIdResponse = ApiResponse<{
  grammarExercise: TGrammarExercise;
}>;

export type TGrammarExercisePayload = {
  type: TGrammarExerciseType;
  question: string;
  answer: string;
  options: {
    options: string[];
  };
  explanation: string;
  order: number;
  score: number;
  status: boolean;
  grammarTopicId: string;
};

export type TUpdateGrammarExerciseResponse = ApiResponse<TGrammarExercise>;
export type TDeleteGrammarExerciseResponse = ApiResponse<void>;
export type TRestoreGrammarExerciseResponse = ApiResponse<void>;
export type TForceDeleteGrammarExerciseResponse = ApiResponse<void>;
export type TCreateGrammarExerciseResponse = ApiResponse<TGrammarExercise>;
