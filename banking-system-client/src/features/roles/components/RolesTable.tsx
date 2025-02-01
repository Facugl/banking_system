import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Role } from '../types';

interface Props {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const RolesTable: React.FC<Props> = ({ roles, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Role ID', width: 150 },
    { field: 'name', headerName: 'Role Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={() => crypto.randomUUID()}
        rows={roles}
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

export default RolesTable;
