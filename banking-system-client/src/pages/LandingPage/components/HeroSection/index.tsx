import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';
import { HeroSectionStyled } from './styles';
import GradientButton from '../../../../components/GradientButton';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroSectionStyled id='home'>
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Box>
            <Typography
              variant='h1'
              component='h1'
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Welcome to{' '}
              <Box
                component='span'
                sx={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Horizon Bank
              </Box>
            </Typography>
            <Typography
              variant='h5'
              paragraph
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Your trusted partner for secure and innovative banking solutions
              in the digital age.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent='center'
              sx={{ mt: 4 }}
            >
              <GradientButton
                size='large'
                onClick={() => navigate('/register')}
                endIcon={<ChevronRightIcon />}
              >
                Open an Account
              </GradientButton>
              <Button
                variant='outlined'
                size='large'
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroSection;
