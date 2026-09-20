import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { EntityActionsCell } from '../../../../components';
import { RoleResponse } from '../../types';

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
        <EntityActionsCell
          entityLabel='role'
          onEdit={() => onEdit(params.row as RoleResponse)}
          onDelete={() => onDelete(params.row as RoleResponse)}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ width: { sm: 600, md: '100%' } }}>
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
