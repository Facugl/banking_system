import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import {
  createModule,
  getModules,
  updateModule,
  deleteModule,
} from '../thunks';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { ModuleResponse } from '../types';
import { showSuccess, showError } from '../../../utils/toast';
import { ModuleMessages, ROLES } from '../../../utils/constants';
import { EditModuleModal, ModulesTable } from '../components';
import { ConfirmDeleteModal } from '../../../components';
import { useAuthSession } from '../../../hooks/useAuthSession';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';

const ModulesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modules } = useAppSelector((state) => state.modules);
  const { profile } = useAuthSession();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleResponse | null>(
    null,
  );

  const deleteConfirmation = useDeleteConfirmation<ModuleResponse>({
    deleteAction: (module) => dispatch(deleteModule(module.id)).unwrap(),
    successMessage: ModuleMessages.DELETE_SUCCESS,
    errorMessage: ModuleMessages.ERROR,
  });

  useEffect(() => {
    if (profile?.role !== ROLES.ADMINISTRATOR) return;

    const fetchModules = async () => {
      try {
        await dispatch(getModules()).unwrap();
      } catch (error) {
        showError(ModuleMessages.ERROR);
      }
    };

    fetchModules();
  }, [dispatch]);

  const handleEdit = (module: ModuleResponse) => {
    setSelectedModule(module);
    setModalOpen(true);
  };

  const handleSave = async (
    id: number | null,
    name: string,
    basePath: string,
  ) => {
    try {
      if (id) {
        await dispatch(updateModule({ id, name, basePath })).unwrap();
        showSuccess(ModuleMessages.UPDATE_SUCCESS);
      } else {
        await dispatch(createModule({ name, basePath })).unwrap();
        showSuccess(ModuleMessages.CREATE_SUCCESS);
      }
    } catch (error) {
      showError(ModuleMessages.ERROR);
    }

    setModalOpen(false);
  };

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedModule(null);
            setModalOpen(true);
          }}
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: '180px' },
          }}
        >
          Add Module
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <ModulesTable
          modules={modules}
          onEdit={handleEdit}
          onDelete={deleteConfirmation.requestDelete}
        />
      </Box>

      <EditModuleModal
        open={isModalOpen}
        module={selectedModule}
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

export default ModulesView;
