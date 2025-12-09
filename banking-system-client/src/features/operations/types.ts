export interface OperationCreateRequest {
  name: string;
  path: string;
  httpMethod: string;
  permitAll: boolean;
  moduleId: number;
}

export interface OperationUpdateRequest {
  name?: string;
  path?: string;
  httpMethod?: string;
  permitAll?: boolean;
  moduleId?: number;
}

export interface OperationResponse {
    id: number;
    name: string;
    path: string;
    httpMethod: string;
    permitAll: boolean;
    moduleName: string;
}

export interface OperationsState {
    operations: OperationResponse[];
    isLoading: boolean;
    error: string | null;
}
