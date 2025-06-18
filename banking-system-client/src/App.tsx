import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import AppRoutes from './routes/AppRoutes';
import React, { useMemo } from 'react';
import { createSelector } from 'reselect';
import { RootState } from './store/store';

const selectAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  (isLoading) => isLoading,
);

const App = () => {
  const authLoading = useAppSelector(selectAuthLoading);

  const content = useMemo(() => {
    return (
      <Router>
        <AppRoutes />
      </Router>
    );
  }, [authLoading]);

  return content;
};

export default React.memo(App);
