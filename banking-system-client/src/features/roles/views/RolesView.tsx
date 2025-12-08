import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { createRole, getRoles, updateRole, deleteRole } from '../thunks';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RoleResponse } from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { Messages } from '../../../utils/constants';
import { RolesTable,EditRoleModal } from '../components';
import { ConfirmDeleteModal } from '../../../components';

const RolesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleResponse | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<RoleResponse | null>(null);

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

  const handleDeleteRequest = (role: RoleResponse) => {
    setRoleToDelete(role);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return;

    try {
      await dispatch(deleteRole(roleToDelete.id)).unwrap();
      showSuccess('Role deleted successfully.');
    } catch (error) {
      showError('Failed to delete role.');
    }

    setDeleteModalOpen(false);
    setRoleToDelete(null);
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
          onDelete={handleDeleteRequest}
        />
      </Box>

      <EditRoleModal
        open={isModalOpen}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        itemName={roleToDelete?.name || ''}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={false}
      />
    </Box>
  );
};

export default RolesView;
