import axiosInstance from '../../services/axiosInstance';
import { buildUrl } from '../../utils/buildUrlUtils';
import { ApiEndpoints } from '../../utils/constants';
import { PermissionRequest, PermissionResponse } from './types';

export const createPermissionApi = async (permission: PermissionRequest) => {
  const { data } = await axiosInstance.post<PermissionResponse>(
    ApiEndpoints.PERMISSIONS,
    permission,
  );
  return data;
};

export const getPermissionApi = async (id: number) => {
  const url = buildUrl(ApiEndpoints.PERMISSIONS_BY_ID, { id });
  const { data } = await axiosInstance.get<PermissionResponse>(url);
  return data;
};

export const getPermissionsApi = async () => {
  const { data } = await axiosInstance.get<PermissionResponse[]>(
    ApiEndpoints.PERMISSIONS,
  );
  return data;
};

export const deletePermissionApi = async (id: number) => {
  const url = buildUrl(ApiEndpoints.PERMISSIONS_BY_ID, { id });
  const { data } = await axiosInstance.delete(url);
  return data;
};
