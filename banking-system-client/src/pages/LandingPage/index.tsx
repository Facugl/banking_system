import { Box } from '@mui/material';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  SecuritySection,
  ContactSection,
  CtaSection,
} from './components';
import { Navbar, FooterSection } from '../../components';

const navItems = [
  { label: 'Home', path: '#home' },
  { label: 'About', path: '#about' },
  { label: 'Services', path: '#services' },
  { label: 'Contact', path: '#contact' },
];

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Navbar navItems={navItems} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SecuritySection />
      <ContactSection />
      <CtaSection />
      <FooterSection />
    </Box>
  );
};

export default LandingPage;
