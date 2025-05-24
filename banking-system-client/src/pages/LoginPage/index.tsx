import { LoginForm } from '../../features/auth/components';
import { LoginPageContainer, LoginBackground } from './styles';

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <LoginBackground>
        <LoginForm />
      </LoginBackground>
    </LoginPageContainer>
  );
};

export default LoginPage;
