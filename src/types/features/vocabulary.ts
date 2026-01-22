import { ApiResponse, TMeta } from "@/types/api";

export type TVocabularyDefinition = {
  id: string;
  definition: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  meaningId: string;
};

export type TVocabularyMeaning = {
  id: string;
  vocabularyId: string;
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  definitions: TVocabularyDefinition[];
};

export type TVocabulary = {
  id: string;
  topicId: string;
  topic: {
    name: string;
  };
  word: string;
  translation: string;
  phonetic: string;
  status: boolean;
  imageUrl: string;
  audioUrlUs: string;
  audioUrlUk: string;
  audioUrlAu: string;
  deletedAt: null | string;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  meanings: TVocabularyMeaning[];
};

export type TVocabularyResponse = ApiResponse<{
  vocabularies: TVocabulary[];
  meta: TMeta;
}>;

export type TVocabularyDefinitionPayload = Pick<
  TVocabularyDefinition,
  "definition" | "translation" | "example" | "exampleTranslation"
>;

export type TVocabularyMeaningPayload = Pick<
  TVocabularyMeaning,
  "partOfSpeech" | "synonyms" | "antonyms"
> & {
  definitions: TVocabularyDefinitionPayload[];
};

export type TVocabularyPayload = Pick<
  TVocabulary,
  | "word"
  | "translation"
  | "phonetic"
  | "status"
  | "imageUrl"
  | "audioUrlUs"
  | "audioUrlUk"
  | "audioUrlAu"
  | "topicId"
> & {
  meanings: TVocabularyMeaningPayload[];
};

export type TCreateVocabularyResponse = ApiResponse<TVocabulary>;

export type TVocabularyByIdResponse = ApiResponse<{
  vocabulary: TVocabulary;
}>;

export type TUpdateVocabularyResponse = ApiResponse<TVocabulary>;

export type TDeleteVocabularyResponse = ApiResponse<void>;

export type TRestoreVocabularyResponse = ApiResponse<void>;

export type TForceDeleteVocabularyResponse = ApiResponse<void>;
