// import { createSelector } from 'reselect';
// import { RootState } from '../store';
// import { Role } from '../../utils/constants';

// const selectAuth = (state: RootState) => state.auth;
// const selectCustomer = (state: RootState) => state.customer;

// export const selectAuthData = createSelector(
//   [selectAuth, selectCustomer],
//   (auth, customer) => ({
//     token: auth.token,
//     role:
//       (customer.profile?.role as Role) || sessionStorage.getItem('authToken'),
//     isLoading: auth.isLoading,
//   }),
// );
