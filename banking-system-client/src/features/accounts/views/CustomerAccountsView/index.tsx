import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';
import {
  ErrorMessage,
  EmptyState,
  LoadingSpinner,
} from '../../../../components';
import AccountCard from './components/AccountCard';
import { useAccountActions } from '../../hooks/useAccountActions';
import { Messages, ToastIds } from '../../../../utils/constants';
import {
  AccountCreateRequest,
  AccountStatus,
  AccountType,
  AccountUpdateRequest,
} from '../../types';
import { EditAccountModal } from '../../components';
import { showError, showSuccess } from '../../../../utils/toast';
import { useAuthSession } from '../../../../hooks/useAuthSession';
import {
  StyledContainer,
  StyledHeader,
  StyledWelcomeTitle,
  StyledAccountsTitle,
  StyledAccountsGrid,
  StyledLoadingContainer,
} from './styles';

const CustomerAccountsView: React.FC = () => {
  const { profile, isSessionLoading: profileLoading } = useAuthSession();

  const {
    accounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = useAppSelector((state) => state.accounts);

  const {
    handleGetAccounts,
    handleCreateAccount,
    isLoading: operationLoading,
    error: operationError,
  } = useAccountActions();

  const hasFetchedRef = useRef(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (profile && !accountsLoading && !hasFetchedRef.current) {
      handleGetAccounts();
      hasFetchedRef.current = true;
    }
  }, [profile, accountsLoading, handleGetAccounts]);

  const handleSubmit = async (
    data: AccountCreateRequest | AccountUpdateRequest,
  ): Promise<void> => {
    try {
      const createData: AccountCreateRequest = {
        type: data.type as AccountType,
        balance: data.balance as number,
        status: data.status as AccountStatus,
      };
      await handleCreateAccount(createData);
      await handleGetAccounts();
      setModalOpen(false);
      showSuccess('Account created successfully!', {
        toastId: ToastIds.ACCOUNT_CREATE_SUCCESS,
      });
    } catch (err) {
      showError('Failed to create account', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
    }
  };

  if (profileLoading || accountsLoading) {
    return (
      <StyledLoadingContainer>
        <LoadingSpinner size={24} />
      </StyledLoadingContainer>
    );
  }

  if (!profile) {
    return <ErrorMessage message={Messages.NOT_FOUND} />;
  }

  if (accountsError) {
    return <ErrorMessage message={Messages.ACCOUNTS_FETCH_ERROR} />;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledWelcomeTitle variant='h4' component='h1'>
          Welcome {profile.username}!
        </StyledWelcomeTitle>
        <Button
          variant='contained'
          onClick={() => setModalOpen(true)}
          disabled={operationLoading}
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
            px: { xs: 2, sm: 3 },
            py: 1,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Add Account
        </Button>
      </StyledHeader>

      {accounts.length > 0 ? (
        <>
          <StyledAccountsTitle variant='h6' component='h2'>
            Your Accounts
          </StyledAccountsTitle>
          <StyledAccountsGrid>
            {accounts.map((account) => (
              <AccountCard key={account.accountNumber} account={account} />
            ))}
          </StyledAccountsGrid>
        </>
      ) : (
        <EmptyState message='No accounts found. Try adding one!' />
      )}

      <EditAccountModal
        open={isModalOpen}
        account={null}
        onClose={() => setModalOpen(false)}
        onSave={handleSubmit}
        isLoading={operationLoading}
        error={operationError?.frontendMessage || null}
        isAdmin={false}
      />
    </StyledContainer>
  );
};

export default CustomerAccountsView;
