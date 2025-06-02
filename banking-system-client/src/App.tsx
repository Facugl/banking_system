import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { logout } from './features/auth/thunks';

const App = () => {
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && role === null) {
      dispatch(logout());
    }
  }, [token, role, dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
