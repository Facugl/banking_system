import { Grid, Typography } from '@mui/material';
import ModernCard, { CardContent } from '../../../../components/ModernCard';
import StatsBox from '../../../../components/StatsBox';
import {
  StyledContainer,
  SectionHeader,
  SectionSubtitle,
  StyledCardTitle,
  BulletPoint,
  ValuesWrapper,
  StatGridContainer,
} from './styles';

const AboutSection = () => {
  return (
    <StyledContainer maxWidth='lg' id='about'>
      <SectionHeader>
        <Typography variant='h2' component='h2' gutterBottom>
          About Horizon Bank
        </Typography>
        <SectionSubtitle variant='h6'>
          Founded in 1990, we've been dedicated to providing secure and
          innovative banking solutions for over three decades.
        </SectionSubtitle>
      </SectionHeader>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <StyledCardTitle variant='h4' component='h3' gutterBottom>
                Our Values
              </StyledCardTitle>
              <ValuesWrapper>
                {[
                  {
                    title: 'Integrity',
                    desc: 'Ethical standards in everything we do',
                  },
                  {
                    title: 'Innovation',
                    desc: 'Technology-driven banking solutions',
                  },
                  {
                    title: 'Customer Focus',
                    desc: 'Your success is our priority',
                  },
                ].map((value, index) => (
                  <BulletPoint key={index}>
                    <div className='dot' />
                    <div>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {value.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {value.desc}
                      </Typography>
                    </div>
                  </BulletPoint>
                ))}
              </ValuesWrapper>
            </CardContent>
          </ModernCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <StyledCardTitle variant='h4' component='h3' gutterBottom>
                Our History
              </StyledCardTitle>
              <Typography
                color='text.secondary'
                sx={{ mb: 4, lineHeight: 1.7 }}
              >
                From a local institution to a trusted name, we've grown to serve
                thousands of customers with reliable financial services.
              </Typography>
              <StatGridContainer container spacing={2}>
                {[
                  { number: '30+', label: 'Years' },
                  { number: '50K+', label: 'Customers' },
                  { number: '99.9%', label: 'Uptime' },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <StatsBox number={stat.number} label={stat.label} />
                  </Grid>
                ))}
              </StatGridContainer>
            </CardContent>
          </ModernCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AboutSection;
