import { CardContent, CardActions, type CardProps } from '@mui/material';
import { ModernCardStyled } from './styles';

interface ModernCardProps extends CardProps {
  children: React.ReactNode;
}

const ModernCard = ({ children, ...props }: ModernCardProps) => (
  <ModernCardStyled {...props}>{children}</ModernCardStyled>
);

export default ModernCard;

export { CardContent, CardActions };
