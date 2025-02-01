import { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import {
  type Account,
  AccountType,
  AccountStatus,
  type AccountUpdateRequest,
} from '../types';

interface EditModalProps {
  open: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (account: AccountUpdateRequest) => void;
}

const EditAccountModal: React.FC<EditModalProps> = ({
  open,
  account,
  onClose,
  onSave,
}) => {
  const [editedAccount, setEditedAccount] = useState<AccountUpdateRequest>({});

  useEffect(() => {
    if (account) {
      setEditedAccount({
        type: account.type,
        balance: account.balance,
        status: account.status,
      });
    } else {
      setEditedAccount({});
    }
  }, [account]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedAccount);
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
          select
          label='Type'
          name='type'
          value={editedAccount.type || ''}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {Object.values(AccountType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label='Balance'
          name='balance'
          type='number'
          value={editedAccount.balance || ''}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          label='Status'
          name='status'
          value={editedAccount.status || ''}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {Object.values(AccountStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
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

export default EditAccountModal;
