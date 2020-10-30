export class ResponseModel<T> {
  code: number;
  message: string;
  data: T;
}

export class ErrorResponseModel {
  status: string;
  message?: string;
  errors: {
    [key: string]: string;
  };
}


export interface DataResponse<T> {
  item: T;
  items: T[];
  pagination: Pagination;
}

export interface Pagination {
  count: number;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
