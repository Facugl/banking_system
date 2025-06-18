import { Typography, type BoxProps } from '@mui/material';
import { StatsBoxStyled } from './styles';

interface StatsBoxProps extends BoxProps {
  number: string;
  label: string;
}

const StatsBox = ({ number, label, ...props }: StatsBoxProps) => (
  <StatsBoxStyled {...props}>
    <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
      {number}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {label}
    </Typography>
  </StatsBoxStyled>
);

export default StatsBox;
