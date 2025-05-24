import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { PrivateRouteProp } from './types';

const PrivateRoute: React.FC<PrivateRouteProp> = ({
  allowedRoles = [],
  publicRoute = false,
  children,
}) => {
  const { token, role, justLoggedIn } = useAppSelector((state) => state.auth);

  if (publicRoute && token && !justLoggedIn) {
    return <Navigate to='/dashboard' replace />;
  }

  if (!publicRoute && !token) {
    return <Navigate to='/login' replace />;
  }

  if (
    !publicRoute &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role!)
  ) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
