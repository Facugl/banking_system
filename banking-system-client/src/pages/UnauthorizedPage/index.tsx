import { Link } from 'react-router-dom';
import {
  UnauthorizedContainer,
  ErrorCode,
  ErrorMessage,
  BackButton,
} from './styles';
import { Messages, HttpStatus, Routes } from '../../utils/constants';

const UnauthorizedPage: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <ErrorCode variant='h1'>{HttpStatus.UNAUTHORIZED}</ErrorCode>
      <ErrorMessage variant='h5'>{Messages.UNAUTHORIZED}</ErrorMessage>
      <BackButton
        variant='contained'
        component={Link}
        to={Routes.HOME}
        aria-label='Navigate back to home page'
      >
        Back to Home
      </BackButton>
    </UnauthorizedContainer>
  );
};

export default UnauthorizedPage;
