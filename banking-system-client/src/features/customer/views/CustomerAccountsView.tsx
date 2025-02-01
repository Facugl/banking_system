import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const CustomerAccountsView: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Account ID', width: 150 },
    { field: 'type', headerName: 'Account Type', width: 200 },
    { field: 'balance', headerName: 'Balance', type: 'number', width: 150 },
  ];

  const rows = [
    { id: 1, type: 'Savings', balance: 1500 },
    { id: 2, type: 'Checking', balance: 3000 },
  ];

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>
        My Accounts
      </Typography>
      <DataGrid
        getRowId={() => crypto.randomUUID()}
        rows={rows}
        columns={columns}
        autoHeight
      />
    </Box>
  );
};

export default CustomerAccountsView;
