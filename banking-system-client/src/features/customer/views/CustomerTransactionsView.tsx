// src/features/customer/views/CustomerTransactionsView.tsx
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const CustomerTransactionsView: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Transaction ID', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = [
    { id: 1, date: '2025-01-01', amount: -500, status: 'Completed' },
    { id: 2, date: '2025-01-02', amount: 1000, status: 'Pending' },
  ];

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>
        My Transactions
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

export default CustomerTransactionsView;
