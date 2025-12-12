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
import { ModuleMessages } from '../../../utils/constants';
import { EditModuleModal, ModulesTable } from '../components';
import { ConfirmDeleteModal } from '../../../components';

const ModulesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modules } = useAppSelector((state) => state.modules);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleResponse | null>(
    null,
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<ModuleResponse | null>(
    null,
  );

  useEffect(() => {
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

  const handleDeleteRequest = (module: ModuleResponse) => {
    setModuleToDelete(module);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!moduleToDelete) return;

    try {
      await dispatch(deleteModule(moduleToDelete.id)).unwrap();
      showSuccess(ModuleMessages.DELETE_SUCCESS);
    } catch (error) {
      showError(ModuleMessages.ERROR);
    }

    setDeleteModalOpen(false);
    setModuleToDelete(null);
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
          onDelete={handleDeleteRequest}
        />
      </Box>

      <EditModuleModal
        open={isModalOpen}
        module={selectedModule}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        itemName={moduleToDelete?.name || ''}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={false}
      />
    </Box>
  );
};

export default ModulesView;
