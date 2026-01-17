export interface Params {
  page?: number;
  search?: string;
  status?: string;
  isDeleted?: boolean;
}

export interface VocabularyParams extends Params {
  topicId?: string;
}
