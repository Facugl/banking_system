import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { PrivateRouteProp } from './types';
import { CenteredBox } from './styles';
import { CircularProgress } from '@mui/material';
import { ROLES } from '../../utils/constants';

const PrivateRoute: React.FC<PrivateRouteProp> = ({
  allowedRoles = [],
  publicRoute = false,
  children,
}) => {
  const { token, role, isLoading, justLoggedIn } = useAppSelector(
    (state) => state.auth,
  );

  const authReady = !isLoading && (role !== null || !token);

  if (!authReady) {
    return (
      <CenteredBox>
        <CircularProgress size={24} />
      </CenteredBox>
    );
  }

  if (publicRoute && token && !justLoggedIn) {
    if (role === ROLES.CUSTOMER) {
      return <Navigate to='/customer-panel' replace />;
    }
    if (role === ROLES.ADMINISTRATOR || role === ROLES.EMPLOYEE) {
      return <Navigate to='/dashboard' replace />;
    }

    return <>{children}</>;
  }

  if (!publicRoute && !token) {
    return <Navigate to='/login' replace />;
  }

  if (!publicRoute && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to='/unauthorized' replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
