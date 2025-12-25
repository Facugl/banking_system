import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PermissionResponse } from '../../types';

interface Props {
  permissions: PermissionResponse[];
  onDelete: (permission: PermissionResponse) => void;
}

const PermissionsTable: React.FC<Props> = ({ permissions, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Permission ID', width: 150 },
    { field: 'operation', headerName: 'Operation Name', flex: 1 },
    { field: 'module', headerName: 'Module Name', flex: 1 },
    { field: 'role', headerName: 'Role Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display='flex' gap={1}>
          <IconButton
            color='error'
            onClick={() => onDelete(params.row as PermissionResponse)}
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
          rows={permissions}
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

export default PermissionsTable;
