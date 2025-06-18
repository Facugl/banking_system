import { Typography, Box } from '@mui/material';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <Box textAlign='center' p={2}>
      <Typography variant='body1' color='text.secondary'>
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
