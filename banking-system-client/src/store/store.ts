import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modulesSlice from '../features/modules/modulesSlice';
import rolesSlice from '../features/roles/rolesSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import customerReducer from '../features/customer/customerSlice';
import statisticsReducer from '../features/statistics/statisticsSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import operationsReducer from '../features/operations/operationsSlice';
import permissionReducer from '../features/permissions/permissionsSlice';
import { configureResponseInterceptor } from '../services/axiosInstance';

const appReducer = combineReducers({
  auth: authReducer,
  statistics: statisticsReducer,
  accounts: accountsReducer,
  modules: modulesSlice,
  roles: rolesSlice,
  customer: customerReducer,
  transactions: transactionReducer,
  operations: operationsReducer,
  permissions: permissionReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout/fulfilled') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

configureResponseInterceptor(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
