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
  itemName: string | number;
  isLoading: boolean;
  title?: string;
  message?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  itemName,
  isLoading,
  title = 'Confirm Delete',
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>
          {message ? (
            message
          ) : (
            <>
              Are you sure you want to delete <strong>{itemName}</strong>? This
              action cannot be undone.
            </>
          )}
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
