import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';
import { HeroSectionStyled, GradientButtonStyled } from './styles';

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
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
                mb: { xs: 2, md: 3 },
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
                mb: { xs: 3, md: 4 },
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                maxWidth: { xs: '100%', md: '800px' },
                mx: 'auto',
              }}
            >
              Your trusted partner for secure and innovative banking solutions
              in the digital age.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2 }}
              justifyContent='center'
              sx={{ mt: { xs: 3, md: 4 } }}
            >
              <GradientButtonStyled
                size='large'
                onClick={() => navigate('/register')}
                endIcon={<ChevronRightIcon />}
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  py: { xs: 1, md: 1.5 },
                }}
                aria-label='Open an account'
              >
                Open an Account
              </GradientButtonStyled>
              <Button
                variant='outlined'
                size='large'
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  py: { xs: 1, md: 1.5 },
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                aria-label='Sign in'
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
