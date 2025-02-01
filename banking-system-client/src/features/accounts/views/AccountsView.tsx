import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  changeAccountStatus,
} from '../thunks';
import { AccountsTable, EditAccountModal } from '../components';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import type {
  Account,
  AccountStatus,
  AccountUpdateRequest,
  AccountCreateRequest,
} from '../types';

const AccountsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.accounts);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        await dispatch(getAccounts());
      } catch (error) {
        console.error('Error loading accounts:', error);
        // Mostrar feedback al usuario (por ejemplo, snackbar)
      }
    };

    fetchAccounts();
  }, [dispatch]);

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const handleSave = async (
    accountData: AccountUpdateRequest | AccountCreateRequest,
  ) => {
    if (selectedAccount?.id) {
      await dispatch(
        updateAccount({
          accountNumber: selectedAccount.accountNumber,
          accountData: accountData as AccountUpdateRequest,
        }),
      );
    } else {
      await dispatch(createAccount(accountData as AccountCreateRequest));
    }
    setModalOpen(false);
  };

  const handleDelete = (account: Account) => {
    if (account.accountNumber) {
      dispatch(deleteAccount(account.accountNumber));
    }
  };

  const handleChangeStatus = (account: Account, newStatus: AccountStatus) => {
    if (account.id) {
      dispatch(
        changeAccountStatus({
          accountNumber: account.accountNumber,
          statusData: { status: newStatus },
        }),
      );
    }
  };

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedAccount(null);
            setModalOpen(true);
          }}
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
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default AccountsView;
