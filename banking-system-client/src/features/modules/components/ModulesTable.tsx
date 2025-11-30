import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getModules } from '../thunks';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';

const ModulesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modules, loading } = useAppSelector((state) => state.modules);

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'basePath', headerName: 'Base Path', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (_params: any) => (
        <Stack direction= 'row' justifyContent='space-between'>
          <Button variant='outlined' color='primary' size='small'>
            Edit
          </Button>
          <Button variant='outlined' color='secondary' size='small'>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box style={{ height: 400, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          getRowId={() => crypto.randomUUID()}
          rows={modules}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 2, page: 0 },
            },
          }}
          pageSizeOptions={[2, 5, 10]}
        />
      )}
    </Box>
  );
};

export default ModulesTable;
