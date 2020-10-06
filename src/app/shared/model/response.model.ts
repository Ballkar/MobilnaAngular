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

