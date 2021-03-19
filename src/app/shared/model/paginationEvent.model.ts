export interface PaginationEvent {
  pageIndex: number;
  pageSize: number;
  length?: number;
  previousPageIndex?: number;
}
