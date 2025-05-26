export interface IPaginationResponse<T> {
  count: number
  page: number
  size: number
  data: T[]
}
