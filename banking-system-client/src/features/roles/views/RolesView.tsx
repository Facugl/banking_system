import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { createRole, getRoles, updateRole, deleteRole } from '../thunks';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RoleResponse } from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { Messages } from '../../../utils/constants';
import { RolesTable, EditRoleModal } from '../components';
import { ConfirmDeleteModal } from '../../../components';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';

const RolesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleResponse | null>(null);

  const deleteConfirmation = useDeleteConfirmation<RoleResponse>({
    deleteAction: (role) => dispatch(deleteRole(role.id)).unwrap(),
    successMessage: 'Role deleted successfully.',
    errorMessage: 'Failed to delete role.',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await dispatch(getRoles()).unwrap();
      } catch (error) {
        showError(Messages.ACCOUNT_FETCH_ERROR);
      }
    };

    fetchRoles();
  }, [dispatch]);

  const handleEdit = (role: RoleResponse) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSave = async (id: number | null, roleName: string) => {
    try {
      if (id) {
        await dispatch(updateRole({ id, name: roleName })).unwrap();
        showSuccess('Role updated successfully.');
      } else {
        await dispatch(createRole({ name: roleName })).unwrap();
        showSuccess('Role created successfully.');
      }
    } catch (error) {
      showError('Failed to save role.');
    }

    setModalOpen(false);
  };

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedRole(null);
            setModalOpen(true);
          }}
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: '180px' },
          }}
        >
          Add Role
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <RolesTable
          roles={roles}
          onEdit={handleEdit}
          onDelete={deleteConfirmation.requestDelete}
        />
      </Box>

      <EditRoleModal
        open={isModalOpen}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={deleteConfirmation.isOpen}
        itemName={deleteConfirmation.itemToDelete?.name || ''}
        onClose={deleteConfirmation.cancelDelete}
        onConfirm={deleteConfirmation.confirmDelete}
        isLoading={deleteConfirmation.isLoading}
      />
    </Box>
  );
};

export default RolesView;
