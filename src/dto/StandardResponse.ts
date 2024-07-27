export interface StandardResponse<T> {
  statusCode: number;
  msg?: string;
  data?: T
  pageCount?: number
}