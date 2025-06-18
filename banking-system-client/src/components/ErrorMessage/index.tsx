import { Typography, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box textAlign='center' p={2}>
      <Typography color='error' variant='body1'>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
