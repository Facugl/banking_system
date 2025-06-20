import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

interface LoadingSpinnerProps extends CircularProgressProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  ...props
}) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100%'
      sx={{ margin: ' 12px 0' }}
    >
      <CircularProgress size={size} {...props} />
    </Box>
  );
};

export default LoadingSpinner;
