import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import modulesSlice from '../features/modules/modulesSlice';
import rolesSlice from '../features/roles/rolesSlice';
import accountsSlice from '../features/accounts/accountsSlice';
import statisticsSlice from '../features/statistics/statisticsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    statistics: statisticsSlice,
    accounts: accountsSlice,
    modules: modulesSlice,
    roles: rolesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
