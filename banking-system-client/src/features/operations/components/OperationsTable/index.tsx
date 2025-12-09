import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OperationResponse } from '../../types';

interface Props {
  operations: OperationResponse[];
  onEdit: (operation: OperationResponse) => void;
  onDelete: (operation: OperationResponse) => void;
}

const OperationsTable: React.FC<Props> = ({
  operations,
  onEdit,
  onDelete,
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'path', headerName: 'Path', flex: 1 },

    {
      field: 'httpMethod',
      headerName: 'Method',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          sx={{ textTransform: 'uppercase' }}
        />
      ),
    },

    {
      field: 'permitAll',
      headerName: 'Permit All',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },

    { field: 'moduleName', headerName: 'Module', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            onClick={() => onEdit(params.row as OperationResponse)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(params.row as OperationResponse)}
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
          sx={{ minWidth: 600 }}
          getRowId={(row) => row.id}
          rows={operations}
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

export default OperationsTable;
