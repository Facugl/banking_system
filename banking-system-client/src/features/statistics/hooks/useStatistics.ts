import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getStatistics } from '../thunks/getStatistics';
import { showError } from '../../../utils/toast';
import { ROLES } from '../../../utils/constants';

export const useStatistics = () => {
  const dispatch = useAppDispatch();
  const { isLoading, statistics, error } = useAppSelector(
    (state) => state.statistics,
  );
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (role === ROLES.ADMINISTRATOR || role === ROLES.EMPLOYEE) {
      dispatch(getStatistics());
    }
  }, [dispatch, role]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage);
    }
  }, [error]);

  return { isLoading, statistics, error };
};
