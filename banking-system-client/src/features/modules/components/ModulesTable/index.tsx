import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModuleResponse } from '../../types';

interface Props {
  modules: ModuleResponse[];
  onEdit: (module: ModuleResponse) => void;
  onDelete: (modole: ModuleResponse) => void;
}

const ModulesTable: React.FC<Props> = ({ modules, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Module ID', width: 150 },
    { field: 'name', headerName: 'Module Name', width: 200 },
    { field: 'basePath', headerName: 'Base Path', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display='flex' gap={1}>
          <IconButton
            color='primary'
            onClick={() => onEdit(params.row as ModuleResponse)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color='error'
            onClick={() => onDelete(params.row as ModuleResponse)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
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
          rows={modules}
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

export default ModulesTable;
