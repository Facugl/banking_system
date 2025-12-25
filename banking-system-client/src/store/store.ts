import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modulesSlice from '../features/modules/modulesSlice';
import rolesSlice from '../features/roles/rolesSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import customerReducer from '../features/customer/customerSlice';
import statisticsReducer from '../features/statistics/statisticsSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import { configureResponseInterceptor } from '../services/axiosInstance';
import operationsReducer from '../features/operations/operationsSlice';
import permissionReducer from '../features/permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    statistics: statisticsReducer,
    accounts: accountsReducer,
    modules: modulesSlice,
    roles: rolesSlice,
    customer: customerReducer,
    transactions: transactionReducer,
    operations: operationsReducer,
    permissions: permissionReducer,
  },
});

configureResponseInterceptor(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
