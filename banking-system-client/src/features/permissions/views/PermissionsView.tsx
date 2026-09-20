import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { getPermissions, deletePermission, createPermission } from '../thunks';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { PermissionResponse } from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { PermissionMessages } from '../../../utils/constants';
import { PermissionsTable, CreatePermissionModal } from '../components';
import { ConfirmDeleteModal } from '../../../components';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';

const PermissionsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.permissions);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionResponse | null>(null);

  const deleteConfirmation = useDeleteConfirmation<PermissionResponse>({
    deleteAction: (permission) =>
      dispatch(deletePermission(permission.id)).unwrap(),
    successMessage: PermissionMessages.DELETE_SUCCESS,
    errorMessage: PermissionMessages.ERROR,
    getMessage: (permission) =>
      `Are you sure you want to remove the permission with ID: ${permission.id}? This action cannot be undone.`,
  });

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
          onDelete={deleteConfirmation.requestDelete}
        />
      </Box>

      <CreatePermissionModal
        open={isModalOpen}
        permission={selectedPermission}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        message={deleteConfirmation.message}
        open={deleteConfirmation.isOpen}
        itemName={deleteConfirmation.itemToDelete?.id || ''}
        onClose={deleteConfirmation.cancelDelete}
        onConfirm={deleteConfirmation.confirmDelete}
        isLoading={deleteConfirmation.isLoading}
      />
    </Box>
  );
};

export default PermissionsView;
