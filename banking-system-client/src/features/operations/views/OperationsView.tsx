import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getOperations,
  createOperation,
  updateOperation,
  deleteOperation,
} from '../thunks';
import {
  OperationResponse,
  OperationCreateRequest,
  OperationUpdateRequest,
} from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { Messages, OperationMessages } from '../../../utils/constants';
import OperationsTable from '../components/OperationsTable';
import EditOperationModal from '../components/EditOperationModal';
import { ConfirmDeleteModal } from '../../../components';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';

const OperationsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { operations } = useAppSelector((state) => state.operations);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] =
    useState<OperationResponse | null>(null);

  const deleteConfirmation = useDeleteConfirmation<OperationResponse>({
    deleteAction: (operation) =>
      dispatch(deleteOperation(operation.id)).unwrap(),
    successMessage: OperationMessages.DELETE_SUCCESS,
    errorMessage: OperationMessages.ERROR,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOperations()).unwrap();
      } catch (error) {
        showError(Messages.ACCOUNT_FETCH_ERROR);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEdit = (operation: OperationResponse) => {
    setSelectedOperation(operation);
    setModalOpen(true);
  };

  const handleSave = async (
    id: number | null,
    data: OperationCreateRequest | OperationUpdateRequest,
  ) => {
    try {
      if (id) {
        await dispatch(
          updateOperation({ id, data: data as OperationUpdateRequest }),
        ).unwrap();
        showSuccess(OperationMessages.UPDATE_SUCCESS);
      } else {
        await dispatch(
          createOperation(data as OperationCreateRequest),
        ).unwrap();
        showSuccess(OperationMessages.CREATE_SUCCESS);
      }
    } catch (error) {
      showError(OperationMessages.ERROR);
    }

    setModalOpen(false);
  };

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedOperation(null);
            setModalOpen(true);
          }}
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: '220px' },
          }}
        >
          Add Operation
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <OperationsTable
          operations={operations}
          onEdit={handleEdit}
          onDelete={deleteConfirmation.requestDelete}
        />
      </Box>

      <EditOperationModal
        open={isModalOpen}
        operation={selectedOperation}
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

export default OperationsView;
