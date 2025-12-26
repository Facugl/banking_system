import { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { AccountsTable, EditAccountModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  Account,
  AccountStatus,
  AccountUpdateRequest,
  AccountCreateRequest,
} from '../../types';
import { useAccountActions } from '../../hooks/useAccountActions';
import {
  ErrorMessage,
} from '../../../../components';
import { Messages } from '../../../../utils/constants';

const AccountsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    accounts,
    isLoading: accountsLoading,
    error,
  } = useAppSelector((state) => state.accounts);
  const {
    handleGetAccounts,
    handleCreateAccount,
    handleUpdateAccount,
    handleDeleteAccount,
    handleChangeAccountStatus,
  } = useAccountActions();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    handleGetAccounts();
  }, [handleGetAccounts]);

  const resetAndFetch = async () => {
    dispatch({ type: 'accounts/resetFetch' });
    hasFetchedRef.current = false;
    await handleGetAccounts();
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const handleSave = async (
    accountData: AccountUpdateRequest | AccountCreateRequest,
  ) => {
    try {
      setOperationLoading(true);
      setOperationError(null);
      if (selectedAccount?.accountNumber) {
        await handleUpdateAccount(
          selectedAccount.accountNumber,
          accountData as AccountUpdateRequest,
        );
      } else {
        await handleCreateAccount(accountData as AccountCreateRequest);
      }
      await resetAndFetch();
      setModalOpen(false);
      setSelectedAccount(null);
    } catch {
      setOperationError('Failed to save account.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDelete = async (account: Account) => {
    try {
      setOperationLoading(true);
      await handleDeleteAccount(account.accountNumber);
      await resetAndFetch();
    } finally {
      setOperationLoading(false);
    }
  };

  const handleChangeStatus = async (
    account: Account,
    newStatus: AccountStatus,
  ) => {
    try {
      setOperationLoading(true);
      await handleChangeAccountStatus(account.accountNumber, {
        status: newStatus,
      });
      await resetAndFetch();
    } finally {
      setOperationLoading(false);
    }
  };

  if (error) {
    return (
      <ErrorMessage
        message={error?.frontendMessage || Messages.ACCOUNTS_FETCH_ERROR}
      />
    );
  }

  // if (accountsLoading) {
  //   return (
  //     <LoadingSpinner />
  //   );
  // }

  // if (!accounts.length) {
  //   return (
  //     <EmptyState message='No accounts available. Create one to get started!' />
  //   );
  // }

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedAccount(null);
            setModalOpen(true);
          }}
          disabled={accountsLoading || operationLoading}
        >
          Add Account
        </Button>
      </Box>
      <AccountsTable
        accounts={accounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />

      <EditAccountModal
        open={isModalOpen}
        account={selectedAccount}
        onClose={() => {
          setModalOpen(false);
          setSelectedAccount(null);
          setOperationError(null);
        }}
        onSave={handleSave}
        isLoading={operationLoading}
        error={operationError}
        isAdmin={true}
      />
    </Box>
  );
};

export default AccountsView;
