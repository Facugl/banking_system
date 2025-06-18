// // src/services/authUtils.ts
// import type { RootState } from '../store/store'; // Import RootState for typing

// // Define store type based on RootState
// type Store = {
//   getState: () => RootState;
//   dispatch: any; // Minimal typing for dispatch; can be refined if needed
// };

// // Declare storeInstance with explicit type
// let storeInstance: Store | undefined;

// // Type the store parameter in setAuthStore
// export const setAuthStore = (s: Store) => {
//   storeInstance = s;
// };

// export const getAuthToken = () => {
//   if (!storeInstance) {
//     console.warn('Store not initialized in authUtils');
//     return sessionStorage.getItem('authToken') || '';
//   }
//   return (
//     storeInstance.getState().auth.token || sessionStorage.getItem('authToken')
//   );
// };
