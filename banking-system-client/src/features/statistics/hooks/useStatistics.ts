import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getStatistics } from '../thunks/getStatistics';

export const useStatistics = () => {
  const dispatch = useAppDispatch();
  const { isLoading, statistics, error } = useAppSelector(
    (state) => state.statistics,
  );

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return { isLoading, statistics, error };
};
