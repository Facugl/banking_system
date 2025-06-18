import { Container, Typography, Chip } from '@mui/material';
import { Shield as ShieldIcon } from '@mui/icons-material';
import { SecuritySectionStyled } from './styles';

const SecuritySection = () => {
  return (
    <SecuritySectionStyled>
      <Container maxWidth='md'>
        <ShieldIcon sx={{ fontSize: 80, color: 'primary.light', mb: 3 }} />
        <Typography
          variant='h2'
          component='h2'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Your Security, Our Priority
        </Typography>
        <Typography variant='h6' sx={{ mb: 4, opacity: 0.9 }}>
          Horizon Bank employs state-of-the-art encryption and multi-factor
          authentication to protect your financial information.
        </Typography>
        <Chip
          label='FDIC Insured'
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontSize: '1rem',
            py: 2,
            px: 1,
          }}
        />
      </Container>
    </SecuritySectionStyled>
  );
};

export default SecuritySection;
