export interface RoleRequest {
  name: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  permissions: string[];
}

export interface RolesState {
  roles: RoleResponse[];
  isLoading: boolean;
  error: string | null;
}
