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
}

export interface AccountCreateRequest {
  type: AccountType;
  balance: number;
}

export interface AccountOperationRequest {
  amount: number;
  comment?: string;
}

export interface TransferRequest {
  targetAccountNumber: string;
  amount: number;
  comment?: string;
}

export interface AccountStatusRequest {
  status: AccountStatus;
}

export interface AccountUpdateRequest {
  type?: AccountType;
  balance?: number;
  status?: AccountStatus;
}

export interface AccountsState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
}
