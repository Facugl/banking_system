import { useEffect, useRef, useState } from 'react';
import { Button, Grid } from '@mui/material';
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

  const { accounts, error: accountsError } = useAppSelector(
    (state) => state.accounts,
  );

  const {
    handleGetAccounts,
    handleCreateAccount,
    isOperating,
    error: operationError,
  } = useAccountActions();

  const hasFetchedRef = useRef(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hasLoadedAccounts, setHasLoadedAccounts] = useState(false);

  useEffect(() => {
    if (profile && !hasFetchedRef.current) {
      handleGetAccounts().finally(() => setHasLoadedAccounts(true));
      hasFetchedRef.current = true;
    }
  }, [profile, handleGetAccounts]);

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

  if (profileLoading || !hasLoadedAccounts) {
    return (
      <StyledLoadingContainer>
        <LoadingSpinner />
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
          disabled={isOperating}
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
          aria-label='Add new account'
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
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {accounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.accountNumber}>
                  <AccountCard account={account} />
                </Grid>
              ))}
            </Grid>
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
        isLoading={isOperating}
        error={operationError?.frontendMessage || null}
        isAdmin={false}
      />
    </StyledContainer>
  );
};

export default CustomerAccountsView;
