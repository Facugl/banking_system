import axiosInstance from '../../../services/axiosInstance';
import {
  OperationCreateRequest,
  OperationUpdateRequest,
  OperationResponse,
} from '../types';

export const createOperationApi = async (operation: OperationCreateRequest) => {
  return await axiosInstance.post<OperationResponse>('/operations', operation);
};

export const getOperationApi = async (id: number) => {
  return await axiosInstance.get<OperationResponse>(`/operations/${id}`);
};

export const getOperationsApi = async () => {
  return await axiosInstance.get<OperationResponse[]>('/operations');
};

export const updateOperationApi = async (
  id: number,
  operation: OperationUpdateRequest,
) => {
  return await axiosInstance.put<OperationResponse>(
    `/operations/${id}`,
    operation,
  );
};

export const deleteOperationApi = async (id: number) => {
  await axiosInstance.delete(`/operations/${id}`);
};
