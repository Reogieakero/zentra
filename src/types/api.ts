export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  redirectTo?: string;
  role?: string;
}
