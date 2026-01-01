import axiosInstance from '../../services/axiosInstance';
import { RoleRequest, RoleResponse } from './types';

export const createRoleApi = async (role: RoleRequest) => {
  return await axiosInstance.post<RoleResponse>('/roles', role);
};

export const getRoleApi = async (id: number) => {
  return await axiosInstance.get<RoleResponse>(`/roles/${id}`);
};

export const getRolesApi = async () => {
  return await axiosInstance.get<RoleResponse[]>('/roles');
};

export const updateRoleApi = async (id: number, role: RoleRequest) => {
  return await axiosInstance.put<RoleResponse>(`/roles/${id}`, role);
};

export const deleteRoleApi = async (id: number) => {
  await axiosInstance.delete(`/roles/${id}`);
};
