import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modulesSlice from '../features/modules/modulesSlice';
import rolesSlice from '../features/roles/rolesSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import statisticsReducer from '../features/statistics/statisticsSlice';
import { configureResponseInterceptor } from '../services/axiosInstance';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    statistics: statisticsReducer,
    accounts: accountsReducer,
    modules: modulesSlice,
    roles: rolesSlice,
  },
});

configureResponseInterceptor(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
