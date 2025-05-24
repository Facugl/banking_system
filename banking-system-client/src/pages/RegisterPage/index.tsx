import { RegisterForm } from '../../features/auth/components';
import { RegisterPageContainer, RegisterBackground } from './styles';

const RegisterPage: React.FC = () => {
  return (
    <RegisterPageContainer>
      <RegisterBackground>
        <RegisterForm />
      </RegisterBackground>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
