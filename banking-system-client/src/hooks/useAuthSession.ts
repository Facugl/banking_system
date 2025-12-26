import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/thunks';
import bootstrapSession from '../features/auth/thunks/bootstrapSession';

export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  const { token, sessionLoading } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.customer);

  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    if (!token || sessionReady) return;

    dispatch(bootstrapSession())
      .unwrap()
      .then(() => setSessionReady(true))
      .catch(() => dispatch(logout()));
  }, [token, sessionReady, dispatch]);

  return {
    token,
    profile,
    role: profile?.role,
    sessionReady,
    sessionLoading,
  };
};
