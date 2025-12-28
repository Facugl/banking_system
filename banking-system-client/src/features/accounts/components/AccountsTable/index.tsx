import { useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Refresh, AttachMoney, MoneyOff, Send } from '@mui/icons-material';
import { DepositModal, WithdrawModal, TransferModal } from '../index';
import { AccountsTableProps, AccountStatus } from '../../types';
import { useAccountActions } from '../../hooks/useAccountActions';
import { showError } from '../../../../utils/toast';
import { EmptyState, LoadingSpinner } from '../../../../components';
import { usePermissions } from '../../../permissions/hooks/usePermissions';
import { PERMISSIONS } from '../../../../utils/constants';
import { Edit, Delete, ToggleOff, ToggleOn } from '@mui/icons-material';

const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const { handleGetAccountBalance, isLoading } = useAccountActions({
    showErrorToast: false,
  });
  const { has } = usePermissions();
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<
    string | null
  >(null);

  const handleSuccess = async () => {
    if (selectedAccountNumber) {
      await handleGetAccountBalance(selectedAccountNumber);
    }
  };

  const handleError = (message: string) => {
    showError(message);
  };

  const handleOpenDepositModal = (accountNumber: string) => {
    setSelectedAccountNumber(accountNumber);
    setDepositModalOpen(true);
  };

  const handleOpenWithdrawModal = (accountNumber: string) => {
    setSelectedAccountNumber(accountNumber);
    setWithdrawModalOpen(true);
  };

  const handleOpenTransferModal = (accountNumber: string) => {
    setSelectedAccountNumber(accountNumber);
    setTransferModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'accountNumber', headerName: 'Account Number', width: 150 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'balance', headerName: 'Balance', width: 120, type: 'number' },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 320,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display='flex' gap={1}>
          {has(PERMISSIONS.UPDATE_ONE_ACCOUNT) && (
            <Tooltip title='Edit account'>
              <IconButton size='small' onClick={() => onEdit(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.DELETE_ONE_ACCOUNT) && (
            <Tooltip title='Delete account'>
              <IconButton
                size='small'
                color='error'
                onClick={() => onDelete(row)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.UPDATE_ACCOUNT_STATUS) && (
            <Tooltip
              title={
                row.status === AccountStatus.ACTIVE
                  ? 'Deactivate account'
                  : 'Activate account'
              }
            >
              <IconButton
                size='small'
                color='primary'
                onClick={() =>
                  onChangeStatus(
                    row,
                    row.status === AccountStatus.ACTIVE
                      ? AccountStatus.INACTIVE
                      : AccountStatus.ACTIVE,
                  )
                }
              >
                {row.status === AccountStatus.ACTIVE ? (
                  <ToggleOff />
                ) : (
                  <ToggleOn />
                )}
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.CHECK_ACCOUNT_BALANCE) && (
            <Tooltip title='Refresh balance'>
              <IconButton
                size='small'
                onClick={() => handleGetAccountBalance(row.accountNumber)}
                disabled={row.status !== AccountStatus.ACTIVE || isLoading}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.DEPOSIT_INTO_ACCOUNT) && (
            <Tooltip title='Deposit'>
              <IconButton
                size='small'
                color='success'
                onClick={() => handleOpenDepositModal(row.accountNumber)}
                disabled={row.status !== AccountStatus.ACTIVE}
              >
                <AttachMoney />
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.WITHDRAW_FROM_ACCOUNT) && (
            <Tooltip title='Withdraw'>
              <IconButton
                size='small'
                color='warning'
                onClick={() => handleOpenWithdrawModal(row.accountNumber)}
                disabled={row.status !== AccountStatus.ACTIVE}
              >
                <MoneyOff />
              </IconButton>
            </Tooltip>
          )}

          {has(PERMISSIONS.TRANSFER_BETWEEN_ACCOUNTS) && (
            <Tooltip title='Transfer'>
              <IconButton
                size='small'
                color='info'
                onClick={() => handleOpenTransferModal(row.accountNumber)}
                disabled={row.status !== AccountStatus.ACTIVE}
              >
                <Send />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  if (!accounts.length) {
    return <EmptyState message='No accounts available' />;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {isLoading && <LoadingSpinner />}
      <DataGrid
        getRowId={(row) => row.accountNumber}
        rows={accounts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
      {selectedAccountNumber && (
        <>
          <DepositModal
            open={depositModalOpen}
            accountNumber={selectedAccountNumber}
            onClose={() => {
              setDepositModalOpen(false);
              setSelectedAccountNumber(null);
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <WithdrawModal
            open={withdrawModalOpen}
            accountNumber={selectedAccountNumber}
            onClose={() => {
              setWithdrawModalOpen(false);
              setSelectedAccountNumber(null);
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <TransferModal
            open={transferModalOpen}
            sourceAccountNumber={selectedAccountNumber}
            onClose={() => {
              setTransferModalOpen(false);
              setSelectedAccountNumber(null);
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </>
      )}
    </Box>
  );
};

export default AccountsTable;
