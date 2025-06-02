import axiosInstance from '../../services/axiosInstance';
import { StatisticsResponse } from './types';

export const fetchStatistics = async () => {
  const { data } = await axiosInstance.get<StatisticsResponse>('/statistics');
  return data;
};
