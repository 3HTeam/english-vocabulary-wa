export interface TParams {
  page?: number;
  search?: string;
  status?: string;
  isDeleted?: boolean;
}

export interface VocabularyParams extends TParams {
  topicId?: string;
}
