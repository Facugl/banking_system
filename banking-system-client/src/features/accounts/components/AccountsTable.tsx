import type React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { type Account, AccountStatus } from '../types';

interface Props {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
  onChangeStatus: (account: Account, newStatus: AccountStatus) => void;
}

const AccountsTable: React.FC<Props> = ({
  accounts,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'accountNumber', headerName: 'Account Number', width: 150 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'balance', headerName: 'Balance', width: 120, type: 'number' },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: ({ row }) => (
        <Box>
          <Button
            variant='outlined'
            size='small'
            onClick={() => onEdit(row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={() => onDelete(row)}
            sx={{ mr: 1 }}
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
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={() => crypto.randomUUID()}
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
    </Box>
  );
};

export default AccountsTable;
