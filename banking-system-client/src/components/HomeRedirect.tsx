import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ROLES } from '../utils/constants';

const HomeRedirect = () => {
  const { token, role } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  switch (role) {
    case ROLES.ADMINISTRATOR:
      return <Navigate to='/dashboard' replace />;
    case ROLES.CUSTOMER:
      return <Navigate to='/dashboard/accounts' replace />;
    default:
      return <Navigate to='/unauthorized' replace />;
  }
};

export default HomeRedirect;
