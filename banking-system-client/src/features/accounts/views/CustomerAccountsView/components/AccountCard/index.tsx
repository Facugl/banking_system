import React, { useState, useCallback } from 'react';
import {
  IconButton,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Visibility, VisibilityOff, Refresh } from '@mui/icons-material';
import { Account, AccountStatus } from '../../../../types';
import { useAccountActions } from '../../../../hooks/useAccountActions';
import { maskAccountNumber } from '../../../../../../utils/maskAccountNumber';
import {
  DepositModal,
  TransferModal,
  WithdrawModal,
} from '../../../../components';
import { showError, showSuccess } from '../../../../../../utils/toast';
import { PERMISSIONS, ToastIds } from '../../../../../../utils/constants';
import {
  StyledCard,
  StyledAccountType,
  StyledAccountInfo,
  StyledAccountNumber,
  StyledBalanceContainer,
  StyledBalanceText,
  StyledButtonContainer,
  StyledInactiveMessage,
} from './styles';
import { LoadingSpinner } from '../../../../../../components';
import { usePermissions } from '../../../../../permissions/hooks/usePermissions';

interface AccountCardProps {
  account: Account;
  isOperating?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [confirmDeactivateOpen, setConfirmDeactivateOpen] = useState(false);
  const { handleGetAccountBalance, handleChangeAccountStatus, isOperating } =
    useAccountActions({
      showErrorToast: false,
    });
  const isActive = account.status === AccountStatus.ACTIVE;
  const { has, isCustomer } = usePermissions();

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullNumber((prev) => !prev);
  };

  const displayedNumber = maskAccountNumber(
    account.accountNumber,
    showFullNumber,
  );

  const handleCopyToClipboard = async () => {
    const text = account.accountNumber;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showSuccess('Account number copied to clipboard!', {
          toastId: ToastIds.ACCOUNT_CREATE_SUCCESS,
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showSuccess('Account number copied to clipboard!', {
          toastId: ToastIds.ACCOUNT_CREATE_SUCCESS,
        });
      }
    } catch (err) {
      showError('Failed to copy account number', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
    }
  };

  const handleRefreshBalance = async () => {
    if (!isActive) {
      showError('Cannot refresh balance for inactive account', {
        toastId: ToastIds.BALANCE_ERROR,
      });
      return;
    }
    try {
      await handleGetAccountBalance(account.accountNumber);
    } catch (err) {
      showError('Error when updating balance', {
        toastId: ToastIds.BALANCE_ERROR,
      });
    }
  };

  const handleOpenDepositModal = () => {
    if (!isActive) {
      showError('Cannot deposit to inactive account', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
      return;
    }
    setDepositModalOpen(true);
  };

  const handleOpenWithdrawModal = () => {
    if (!isActive) {
      showError('Cannot withdraw from inactive account', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
      return;
    }
    setWithdrawModalOpen(true);
  };

  const handleOpenTransferModal = () => {
    if (!isActive) {
      showError('Cannot transfer from inactive account', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
      return;
    }
    setTransferModalOpen(true);
  };

  const handleDeactivate = () => {
    setConfirmDeactivateOpen(true);
  };

  const confirmDeactivate = async () => {
    try {
      await handleChangeAccountStatus(account.accountNumber, {
        status: AccountStatus.INACTIVE,
      });
      showSuccess('Account deactivated successfully!', {
        toastId: ToastIds.ACCOUNT_STATUS_SUCCESS,
      });
      setConfirmDeactivateOpen(false);
    } catch (err: any) {
      showError(err.message || 'Failed to deactivate account', {
        toastId: ToastIds.ACCOUNT_ERROR,
      });
      setConfirmDeactivateOpen(false);
    }
  };

  const handleSuccess = useCallback(() => {
    handleGetAccountBalance(account.accountNumber).catch(() => {
      showError('Error when updating balance', {
        toastId: ToastIds.BALANCE_ERROR,
      });
    });
    setDepositModalOpen(false);
    setWithdrawModalOpen(false);
    setTransferModalOpen(false);
  }, [handleGetAccountBalance, account.accountNumber]);

  const handleError = (message: string) => {
    showError(message, { toastId: ToastIds.ACCOUNT_ERROR });
  };

  return (
    <>
      <StyledCard>
        <StyledAccountType variant='subtitle1' component='h3'>
          {account.type}
        </StyledAccountType>
        <StyledAccountInfo>
          <Tooltip title={account.accountNumber} arrow>
            <StyledAccountNumber
              variant='body2'
              component='p'
              onClick={handleCopyToClipboard}
            >
              Account Number: {displayedNumber}
            </StyledAccountNumber>
          </Tooltip>
          <IconButton onClick={toggleVisibility} size='small'>
            {showFullNumber ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </StyledAccountInfo>
        <StyledBalanceContainer>
          <StyledBalanceText variant='body2' component='p'>
            Balance: ${account.balance.toFixed(2)}
          </StyledBalanceText>
          <Tooltip
            title={
              isActive
                ? 'Refresh Balance'
                : 'Cannot refresh balance for inactive account'
            }
          >
            <span>
              <IconButton
                size='small'
                onClick={handleRefreshBalance}
                disabled={!isActive || isOperating}
              >
                <Refresh />
              </IconButton>
            </span>
          </Tooltip>
        </StyledBalanceContainer>
        <StyledButtonContainer>
          {isActive ? (
            <>
              <Tooltip title='Deposit'>
                <Button
                  variant='outlined'
                  onClick={handleOpenDepositModal}
                  disabled={isOperating}
                >
                  Deposit
                </Button>
              </Tooltip>
              <Tooltip title='Withdraw'>
                <Button
                  variant='outlined'
                  onClick={handleOpenWithdrawModal}
                  disabled={isOperating}
                >
                  Withdraw
                </Button>
              </Tooltip>
              <Tooltip title='Transfer'>
                <Button
                  variant='outlined'
                  onClick={handleOpenTransferModal}
                  disabled={isOperating}
                >
                  Transfer
                </Button>
              </Tooltip>
              {!isCustomer && has(PERMISSIONS.UPDATE_ACCOUNT_STATUS) && (
                <Tooltip title='Deactivate Account'>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={handleDeactivate}
                    disabled={isOperating}
                  >
                    Deactivate
                  </Button>
                </Tooltip>
              )}
            </>
          ) : (
            <StyledInactiveMessage variant='body2' component='p'>
              This account is inactive. Contact support to reactivate.
            </StyledInactiveMessage>
          )}
        </StyledButtonContainer>
      </StyledCard>
      {isActive && (
        <>
          <DepositModal
            open={depositModalOpen}
            accountNumber={account.accountNumber}
            onClose={() => setDepositModalOpen(false)}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <WithdrawModal
            open={withdrawModalOpen}
            accountNumber={account.accountNumber}
            onClose={() => setWithdrawModalOpen(false)}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <TransferModal
            open={transferModalOpen}
            sourceAccountNumber={account.accountNumber}
            onClose={() => setTransferModalOpen(false)}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </>
      )}
      <Dialog
        open={confirmDeactivateOpen}
        onClose={() => !isOperating && setConfirmDeactivateOpen(false)}
      >
        <DialogTitle>Confirm Account Deactivation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate account{' '}
            <strong>{account.accountNumber}</strong>? This action will prevent
            deposits, withdrawals, and transfers until the account is
            reactivated.
          </DialogContentText>

          {isOperating && <LoadingSpinner />}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => setConfirmDeactivateOpen(false)}
            disabled={isOperating}
            variant='outlined'
          >
            Cancel
          </Button>
          {isActive &&
            !isCustomer &&
            has(PERMISSIONS.UPDATE_ACCOUNT_STATUS) && (
              <Button
                onClick={confirmDeactivate}
                color='error'
                variant='outlined'
              >
                Deactivate
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(AccountCard);
