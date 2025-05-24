import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modulesSlice from '../features/modules/modulesSlice';
import rolesSlice from '../features/roles/rolesSlice';
import accountsSlice from '../features/accounts/accountsSlice';
import statisticsSlice from '../features/statistics/statisticsSlice';
import { configureResponseInterceptor } from '../services/axiosInstance';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    statistics: statisticsSlice,
    accounts: accountsSlice,
    modules: modulesSlice,
    roles: rolesSlice,
  },
});

configureResponseInterceptor(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
