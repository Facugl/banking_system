import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/thunks';
import bootstrapSession from '../features/auth/thunks/bootstrapSession';

export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  const {
    token,
    sessionLoading,
    sessionReady,
  } = useAppSelector((state) => state.auth);

  const { profile } = useAppSelector((state) => state.customer);

  useEffect(() => {
    if (!token) return;

    if (sessionReady) return;

    dispatch(bootstrapSession())
      .unwrap()
      .catch(() => dispatch(logout()));
  }, [token, sessionReady, dispatch]);

  return {
    token,
    profile,
    role: profile?.role,
    sessionLoading,
    sessionReady,
  };
};
