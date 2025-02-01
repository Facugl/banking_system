import axiosInstance from '../../../services/axiosInstance';
import { ModuleRequest, ModuleResponse } from '../types';

export const createModuleApi = async (module: ModuleRequest) => {
  return await axiosInstance.post<ModuleResponse>('/modules', module);
};

export const getModuleApi = async (id: number) => {
  return await axiosInstance.get<ModuleResponse>(`/modules/${id}`);
};

export const getAllModulesApi = async () => {
  return await axiosInstance.get<ModuleResponse[]>('/modules');
};

export const updateModuleApi = async (id: number, module: ModuleRequest) => {
  return await axiosInstance.put<ModuleResponse>(`/modules/${id}`, module);
};

export const deleteModuleApi = async (id: number) => {
  await axiosInstance.delete(`/modules/${id}`);
};
