import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { ModulesForm, ModulesTable } from '../components';

const ModulesView: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Module
      </Button>
      <ModulesTable />
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', mt: 5 }}>
          <ModulesForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModulesView;
