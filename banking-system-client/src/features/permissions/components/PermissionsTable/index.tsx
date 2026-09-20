import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { EntityActionsCell } from '../../../../components';
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
        <EntityActionsCell
          entityLabel='permission'
          onDelete={() => onDelete(params.row as PermissionResponse)}
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
