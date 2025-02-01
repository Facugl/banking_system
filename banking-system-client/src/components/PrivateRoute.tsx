import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

type PrivateRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { token, role } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (!allowedRoles.includes(role!)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
