import axiosInstance from '../../../services/axiosInstance';
import { StatisticsResponse } from '../types';

export const fetchStatistics = async (): Promise<StatisticsResponse> => {
  const { data } = await axiosInstance.get('/statistics');
  return data;
};
