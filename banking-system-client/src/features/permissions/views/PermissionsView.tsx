import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { getPermissions, deletePermission, createPermission } from '../thunks';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { PermissionResponse } from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { PermissionMessages } from '../../../utils/constants';
import { PermissionsTable, CreatePermissionModal } from '../components';
import { ConfirmDeleteModal } from '../../../components';

const PermissionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.permissions);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionResponse | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] =
    useState<PermissionResponse | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        await dispatch(getPermissions()).unwrap();
      } catch (error) {
        showError(PermissionMessages.ERROR);
      }
    };

    fetchPermissions();
  }, [dispatch]);

  const handleSave = async (role: string, operation: string) => {
    try {
      await dispatch(createPermission({ role, operation })).unwrap();
      showSuccess(PermissionMessages.CREATE_SUCCESS);
    } catch (error) {
      showError(PermissionMessages.ERROR);
    }

    setModalOpen(false);
  };

  const handleDeleteRequest = (permission: PermissionResponse) => {
    setPermissionToDelete(permission);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!permissionToDelete) return;

    try {
      await dispatch(deletePermission(permissionToDelete.id)).unwrap();
      showSuccess(PermissionMessages.DELETE_SUCCESS);
    } catch (error) {
      showError(PermissionMessages.ERROR);
    }

    setDeleteModalOpen(false);
    setPermissionToDelete(null);
  };

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedPermission(null);
            setModalOpen(true);
          }}
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: '180px' },
          }}
        >
          Add Permission
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <PermissionsTable
          permissions={permissions}
          onDelete={handleDeleteRequest}
        />
      </Box>

      <CreatePermissionModal
        open={isModalOpen}
        permission={selectedPermission}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        message={`Are you sure you want to remove the permission with ID: ${permissionToDelete?.id}? This action cannot be undone.`}
        open={deleteModalOpen}
        itemName={permissionToDelete?.id || ''}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={false}
      />
    </Box>
  );
};

export default PermissionsView;
