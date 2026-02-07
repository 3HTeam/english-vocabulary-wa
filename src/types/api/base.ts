export type ApiResponse<TData = unknown> = {
  statusCode: number;
  data?: TData;
  message?: string | string[];
  timestamp?: string;
  path?: string;
};
