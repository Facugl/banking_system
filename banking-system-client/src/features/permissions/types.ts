import { AppError } from "../../types";

export interface PermissionRequest {
  role: string;
  operation: string;
}

export interface PermissionResponse {
  id: number;
  operation: string;
  module: string;
  role: string;
}

export interface PermisionsState {
    permissions: PermissionResponse[];
    isLoading: boolean;
    error: AppError | null;
}