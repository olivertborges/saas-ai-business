export type ID = string;

export type UUID = string;

export interface BusinessContext {
  businessId: UUID;
  userId: UUID;
}

export interface ApiResponse<T> {
  data: T;
  requestId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  requestId?: string;
}
