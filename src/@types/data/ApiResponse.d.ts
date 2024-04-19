type ApiResponse<T> = {
  success: boolean;
  errorMessage?: string;
  data?: T;
  statusCode: number;
};

type PagedReponse<T> = {
  data?: T;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};
