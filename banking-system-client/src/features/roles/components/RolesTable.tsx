import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { RoleResponse } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  roles: RoleResponse[];
  onEdit: (role: RoleResponse) => void;
  onDelete: (role: RoleResponse) => void;
}

const RolesTable: React.FC<Props> = ({ roles, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Role ID', width: 150 },
    { field: 'name', headerName: 'Role Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display='flex' gap={1}>
          <IconButton
            color='primary'
            onClick={() => onEdit(params.row as RoleResponse)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color='error'
            onClick={() => onDelete(params.row as RoleResponse)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ width: {sm: 600, md: '100%'} }}>
        <DataGrid
          sx={{
            minWidth: 600,
          }}
          getRowId={(row) => row.id}
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
    </Box>
  );
};

export default RolesTable;
