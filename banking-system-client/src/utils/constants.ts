export const ROLES = {
  ADMINISTRATOR: 'ADMINISTRATOR',
  EMPLOYEE: 'EMPLOYEE',
  CUSTOMER: 'CUSTOMER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const permissionLabels: Record<string, string> = {
  CREATE_ONE_ACCOUNT: 'Create customer account',
  READ_ONE_ACCOUNT: 'View one account',
  READ_ALL_ACCOUNTS: 'View all accounts',
  UPDATE_ACCOUNT_STATUS: 'Update account status',
  DEPOSIT_INTO_ACCOUNT: 'Deposit into account',
  WITHDRAW_FROM_ACCOUNT: 'Withdraw from account',
  TRANSFER_BETWEEN_ACCOUNTS: 'Transfer between accounts',
  CHECK_ACCOUNT_BALANCE: 'Check account balance',
  READ_ONE_TRANSACTION: 'View one transaction',
};

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const Messages = {
  GENERIC_ERROR: 'An unexpected error occurred.',
  UNKNOWN: 'Unknown error.',
  UNAUTHORIZED: 'You are not authorized to access this page.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  NO_TOKEN: 'Token not found.',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Register successfull',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  PROFILE_FETCH_ERROR: 'Failed to fetch profile.',
  AUTHENTICATION_FAILED: 'Failed to log in.',
  REGISTRATION_FAILED: 'An unexpected error occurred during registration.',
  FETCH_ACCOUNT_BALANCE_FAILED:
    'An unexpected error occurred while obtaining the account balance.',
  LOGOUT_FAILED: 'An unexpected error occurred during logout.',
  ACCOUNT_CREATE_FAILED: 'Failed to create account.',
  ACCOUNT_FETCH_ERROR: 'Failed to fetch account.',
  ACCOUNTS_FETCH_ERROR: 'Failed to fetch accounts.',
  NO_ACCOUNTS_AVAILABLE: 'No accounts available. Create one to get started!',
  ACCOUNT_UPDATE_FAILED: 'Failed to update account.',
  ACCOUNT_DELETE_FAILED: 'Failed to delete account.',
  ACCOUNT_STATUS_UPDATE_FAILED: 'Failed to update account status.',
  DEPOSIT_FAILED: 'Failed to perform deposit.',
  WITHDRAW_FAILED: 'Failed to perform withdrawal.',
  TRANSFER_FAILED: 'Failed to perform transfer.',
  TARGET_ACCOUNT_REQUIRED: 'Target account number is required.',
  AMOUNT_REQUIRED: 'Amount is required.',
  INVALID_AMOUNT: 'Amount must be a positive number.',
  SAME_ACCOUNT_TRANSFER: 'Cannot transfer to the same account.',
  TRANSACTION_FETCH_ERROR: 'Failed to fetch transaction.',
  TRANSACTIONS_FETCH_ERROR: 'Failed to fetch transactions.',
  TRANSACTIONS_NOT_FOUND: 'No transactions found.',
  TRANSACTION_NOT_FOUND: 'No transaction found.',
  COMMENT_NOT_EMPTY: 'Comment cannot be empty',
} as const;

export const ApiEndpoints = {
  PROFILE: '/auth/profile',
  AUTHENTICATE: '/auth/authenticate',
  REGISTER: '/users',
  LOGOUT: '/auth/logout',
  ACCOUNTS: '/accounts',
  ACCOUNT_BY_NUMBER: '/accounts/:accountNumber',
  ACCOUNT_BALANCE: '/accounts/:accountNumber/balance',
  ACCOUNT_DEPOSIT: '/accounts/:accountNumber/deposit',
  ACCOUNT_WITHDRAW: '/accounts/:accountNumber/withdraw',
  ACCOUNT_TRANSFER: '/accounts/:accountNumber/transfer',
  ACCOUNT_STATUS: '/accounts/:accountNumber/change-status',
  TRANSACTIONS: '/transactions',
  TRANSACTION_BY_NUMBER: '/transactions/:transactionNumber',
} as const;

export const ToastIds = {
  SESSION_EXPIRED: 'session-expired',
  PROFILE_SUCCESS: 'profile-success',
  LOGIN_SUCCESS: 'login-success',
  REGISTER_SUCCESS: 'register-success',
  PROFILE_ERROR: 'profile-error',
  AUTH_ERROR: 'auth-error',
  ACCOUNT_CREATE_SUCCESS: 'account-create-success',
  ACCOUNT_FETCH_SUCCESS: 'account-fetch-success',
  ACCOUNTS_FETCH_SUCCESS: 'accounts-fetch-success',
  ACCOUNT_UPDATE_SUCCESS: 'account-update-success',
  ACCOUNT_DELETE_SUCCESS: 'account-delete-success',
  ACCOUNT_STATUS_SUCCESS: 'account-status-success',
  DEPOSIT_SUCCESS: 'deposit-success',
  WITHDRAW_SUCCESS: 'withdraw-success',
  TRANSFER_SUCCESS: 'transfer-success',
  ACCOUNT_ERROR: 'account-error',
  TRANSACTION_ERROR: 'transaction-error',
  BALANCE_ERROR: 'balance-error',
  BALANCE_SUCCESS: 'balance-success',
} as const;

export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  DASHBOARD: '/dashboard',
  DASHBOARD_MODULES: '/dashboard/modules',
  DASHBOARD_ROLES: '/dashboard/roles',
  DASHBOARD_ACCOUNTS: '/dashboard/accounts',
  CUSTOMER_PANEL: '/customer-panel',
  CUSTOMER_TRANSACTIONS: '/customer-panel/transactions',
  CUSTOMER_PROFILE: '/customer-panel/profile',
} as const;
