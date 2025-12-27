export type ApiResponse<TData = unknown> = {
  statusCode: number
  data?: TData
  message?: string
}
