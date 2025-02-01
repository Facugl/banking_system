import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { createRole, getRoles, updateRole, deleteRole } from '../thunks';
import { RolesTable, EditRoleModal } from '../components';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { Role } from '../types';

const RolesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await dispatch(getRoles());
      } catch (error) {
        console.error('Error loading roles:', error);
        // Mostrar feedback al usuario (por ejemplo, snackbar)
      }
    };

    fetchRoles();
  }, [dispatch]);

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSave = async (id: number | null, name: string) => {
    if (id) {
      await dispatch(updateRole({ id, name }));
    } else {
      await dispatch(createRole({ name }));
    }
    setModalOpen(false);
  };

  const handleDelete = (role: Role) => {
    if (role.id) {
      dispatch(deleteRole(role.id));
    }
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
        >
          Add Role
        </Button>
      </Box>
      <RolesTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      <EditRoleModal
        open={isModalOpen}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default RolesView;
