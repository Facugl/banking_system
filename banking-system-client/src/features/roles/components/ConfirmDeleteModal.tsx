import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roleName: string;
  isLoading: boolean;
}
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  roleName,
  isLoading,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete the role <strong>{roleName}</strong>?
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} variant='outlined'>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isLoading}
          color='error'
          variant='contained'
        >
          {isLoading ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
