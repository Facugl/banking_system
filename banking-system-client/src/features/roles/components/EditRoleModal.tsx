import { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Role } from '../types';

interface EditModalProps {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSave: (id: number | null, name: string) => void;
}

const EditRoleModal: React.FC<EditModalProps> = ({
  open,
  role,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (role) setName(role.name);
  }, [role]);

  const handleSave = () => {
    onSave(role?.id || null, name);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          label='Role Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display='flex' justifyContent='flex-end'>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditRoleModal;
