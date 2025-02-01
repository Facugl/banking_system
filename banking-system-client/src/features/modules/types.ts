export interface ModuleRequest {
  name?: string;
  basePath?: string;
}

export interface ModuleResponse {
  id: number;
  name: string;
  basePath: string;
}

export interface ModuleState {
  modules: ModuleResponse[];
  loading: boolean;
  error: string | null;
}
