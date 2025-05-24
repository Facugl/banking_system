import { Link } from 'react-router-dom';
import {
  UnauthorizedContainer,
  ErrorCode,
  ErrorMessage,
  BackButton,
} from './styles';

const UnauthorizedPage: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <ErrorCode variant='h1'>401</ErrorCode>
      <ErrorMessage variant='h5'>
        You are not authorized to access this page
      </ErrorMessage>
      <BackButton
        variant='contained'
        component={Link}
        to='/login'
        aria-label='Navigate back to login page'
      >
        Back to login
      </BackButton>
    </UnauthorizedContainer>
  );
};

export default UnauthorizedPage;
