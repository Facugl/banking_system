// import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../../store/hooks';
// import { ROLES } from '../../utils/constants';

// const HomeRedirect = () => {
//   const { token } = useAppSelector((state) => state.auth);
//   const { profile } = useAppSelector((state) => state.customer);
//   const role = profile?.role;

//   if (!token || !profile) {
//     return <Navigate to='/login' replace />;
//   }

//   if (role === ROLES.CUSTOMER) {
//     return <Navigate to='/customer-panel' replace />;
//   }

//   return <Navigate to='/dashboard' replace />;
// };

// export default HomeRedirect;
