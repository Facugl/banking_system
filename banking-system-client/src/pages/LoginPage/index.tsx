import { BrandLink, FooterSection } from '../../components';
import { LoginForm } from '../../features/auth/components';
import {
  LoginPageContainer,
  LoginContent,
  BrandLinkContainer,
  LoginBackground,
} from './styles';

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <LoginContent>
        <BrandLinkContainer>
          <BrandLink />
        </BrandLinkContainer>

        <LoginBackground>
          <LoginForm />
        </LoginBackground>
      </LoginContent>

      <FooterSection />
    </LoginPageContainer>
  );
};

export default LoginPage;
