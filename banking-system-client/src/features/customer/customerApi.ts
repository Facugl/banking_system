import axiosInstance from '../../services/axiosInstance';
import { ApiEndpoints } from '../../utils/constants';
import { Profile } from './types';

export const customerApi = {
  getProfile: async (): Promise<Profile> => {
    const { data } = await axiosInstance.get<Profile>(ApiEndpoints.PROFILE);

    return data;
  },
};
