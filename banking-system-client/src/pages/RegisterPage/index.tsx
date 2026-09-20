import { BrandLink, FooterSection } from '../../components';
import { RegisterForm } from '../../features/auth/components';
import {
  RegisterPageContainer,
  RegisterContent,
  BrandLinkContainer,
  RegisterBackground,
} from './styles';

const RegisterPage: React.FC = () => {
  return (
    <RegisterPageContainer>
      <RegisterContent>
        <BrandLinkContainer>
          <BrandLink />
        </BrandLinkContainer>

        <RegisterBackground>
          <RegisterForm />
        </RegisterBackground>
      </RegisterContent>

      <FooterSection />
    </RegisterPageContainer>
  );
};

export default RegisterPage;
