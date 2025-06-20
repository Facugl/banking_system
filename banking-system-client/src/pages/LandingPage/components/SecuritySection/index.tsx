import { Container, Typography } from '@mui/material';
import { Shield as ShieldIcon } from '@mui/icons-material';
import { SecuritySectionStyled, ChipStyled } from './styles';

const SecuritySection = () => {
  return (
    <SecuritySectionStyled>
      <Container maxWidth='md'>
        <ShieldIcon
          sx={{
            fontSize: { xs: 50, sm: 60, md: 80 },
            color: 'primary.light',
            mb: { xs: 2, md: 3 },
          }}
        />
        <Typography
          variant='h2'
          component='h2'
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            mb: { xs: 2, md: 3 },
          }}
        >
          Your Security, Our Priority
        </Typography>
        <Typography
          variant='h6'
          sx={{
            mb: { xs: 3, md: 4 },
            opacity: 0.9,
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            maxWidth: { xs: '100%', md: '800px' },
            mx: 'auto',
          }}
        >
          Horizon Bank employs state-of-the-art encryption and multi-factor
          authentication to protect your financial information.
        </Typography>
        <ChipStyled label='FDIC Insured' />
      </Container>
    </SecuritySectionStyled>
  );
};

export default SecuritySection;
