import { ButtonProps } from '@mui/material';
import { GradientButtonStyled } from './styles';

const GradientButton = (props: ButtonProps) => (
  <GradientButtonStyled {...props} />
);

export default GradientButton;
