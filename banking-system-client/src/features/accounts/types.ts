import { AppError } from '../../types';

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  CLOSED = 'CLOSED',
}

export interface Account {
  id: number;
  accountNumber: string;
  type: AccountType;
  balance: number;
  status: AccountStatus;
  owner: string;
  createdAt: string;
}

export interface UseAccountActionsOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export interface UseAccountActionsReturn {
  handleCreateAccount: (account: AccountCreateRequest) => Promise<void>;
  handleGetAccount: (accountNumber: string) => Promise<void>;
  handleGetAccounts: () => Promise<void>;
  handleUpdateAccount: (
    accountNumber: string,
    account: AccountUpdateRequest,
  ) => Promise<void>;
  handleChangeAccountStatus: (
    accountNumber: string,
    status: AccountStatusRequest,
  ) => Promise<void>;
  handleDeleteAccount: (accountNumber: string) => Promise<void>;
  handleGetAccountBalance: (accountNumber: string) => Promise<void>;
  handleDeposit: (
    accountNumber: string,
    operationData: AccountOperationRequest,
  ) => Promise<void>;
  handleWithdraw: (
    accountNumber: string,
    operationData: AccountOperationRequest,
  ) => Promise<void>;
  handleTransfer: (
    sourceAccountNumber: string,
    transferData: TransferRequest,
  ) => Promise<void>;
  isLoading: boolean;
  error: AppError | null;
  resetAccountsFetch: () => void;
  isFetchingAccounts: boolean;
  isOperating: boolean;
}

export interface AccountCreateRequest {
  type: AccountType;
  balance: number;
  status: AccountStatus;
}

export interface AccountUpdateRequest {
  type?: AccountType;
  balance?: number;
  status?: AccountStatus;
}

export interface AccountOperationRequest {
  amount: number;
  comment?: string;
}

export interface TransferRequest {
  sourceAccountNumber?: string;
  targetAccountNumber: string;
  amount: number;
  comment?: string;
}

export interface TransferFormValues {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  amount: number;
  comment?: string;
}

export interface AccountCardProps {
  account: Account;
  isLoading?: boolean;
}

export interface AccountsTableProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
  onChangeStatus: (account: Account, newStatus: AccountStatus) => void;
}

export interface EditModalProps {
  open: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (
    account: AccountUpdateRequest | AccountCreateRequest,
  ) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  isAdmin?: boolean;
}

export interface TransferModalProps {
  open: boolean;
  sourceAccountNumber: string;
  comment?: string;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface DepositModalProps {
  open: boolean;
  accountNumber: string;
  comment?: string;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface WithdrawModalProps {
  open: boolean;
  accountNumber: string;
  comment?: string;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface DepositFormValues {
  amount: number;
  comment?: string;
}

export interface WithdrawFormValues {
  amount: number;
  comment?: string;
}

export interface TransferFormValues {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  amount: number;
  comment?: string;
}

export interface AccountStatusRequest {
  status: AccountStatus;
}

export interface AccountsState {
  accountByNumber: Record<string, Account>;
  accounts: Account[];
  isLoading: boolean;
  error: AppError | null;
  hasFetchedAccounts: boolean;
  isFetchingAccounts: boolean;
  isOperating: boolean;
}
