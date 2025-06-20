import { useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
import { Refresh, AttachMoney, MoneyOff, Send } from '@mui/icons-material';
import { DepositModal, WithdrawModal, TransferModal } from '../index';
import { AccountsTableProps, AccountStatus } from '../../types';
import { useAccountActions } from '../../hooks/useAccountActions';
import { showError } from '../../../../utils/toast';
import { EmptyState, LoadingSpinner } from '../../../../components';

const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const { handleGetAccountBalance, isLoading } = useAccountActions({
    showErrorToast: false,
  });
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
      width: 500,
      renderCell: ({ row }) => (
        <Box display='flex' gap={1}>
          <Button variant='outlined' size='small' onClick={() => onEdit(row)}>
            Edit
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={() => onDelete(row)}
          >
            Delete
          </Button>
          <Button
            variant='outlined'
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
            {row.status === AccountStatus.ACTIVE ? 'Deactivate' : 'Activate'}
          </Button>
          <IconButton
            size='small'
            color='primary'
            onClick={() => handleGetAccountBalance(row.accountNumber)}
            title='Refresh Balance'
            disabled={row.status !== AccountStatus.ACTIVE || isLoading}
          >
            <Refresh />
          </IconButton>
          <IconButton
            size='small'
            color='success'
            onClick={() => handleOpenDepositModal(row.accountNumber)}
            title='Deposit'
            disabled={row.status !== AccountStatus.ACTIVE}
          >
            <AttachMoney />
          </IconButton>
          <IconButton
            size='small'
            color='warning'
            onClick={() => handleOpenWithdrawModal(row.accountNumber)}
            title='Withdraw'
            disabled={row.status !== AccountStatus.ACTIVE}
          >
            <MoneyOff />
          </IconButton>
          <IconButton
            size='small'
            color='info'
            onClick={() => handleOpenTransferModal(row.accountNumber)}
            title='Transfer'
            disabled={row.status !== AccountStatus.ACTIVE}
          >
            <Send />
          </IconButton>
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
