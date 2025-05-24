import styled from '@emotion/styled';
import { Box, Typography, Button, ButtonProps } from '@mui/material';
import { LinkProps } from 'react-router-dom';

interface LinkNavigationProps {
  to: LinkProps['to'];
  replace?: LinkProps['replace'];
  state?: LinkProps['state'];
}

interface BackButtonProps extends ButtonProps, LinkNavigationProps {}

export const UnauthorizedContainer = styled(Box)`
  max-width: 450px;
  height: 400px;
  margin: 2rem auto;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background-color: #ffffff; /* palette.background.paper */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    margin: 1rem;
    width: auto;
  }
`;

export const ErrorCode = styled(Typography)`
  font-size: 6rem;
  font-weight: 700;
  color: #1a365d; /* palette.primary.main */
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #b8a369; /* palette.secondary.main */
    border-radius: 2px;
  }
`;

export const ErrorMessage = styled(Typography)`
  font-size: 1.5rem;
  color: #4a5568; /* palette.text.secondary */
  margin-bottom: 2rem;
`;

export const BackButton = styled(Button)<BackButtonProps>`
  padding: 0.8rem 2rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: #1a365d; /* palette.primary.main */
  color: #ffffff; /* palette.primary.contrastText */
  transition: all 0.3s ease;

  &:hover {
    background-color: #2c5282; /* palette.primary.light */
    box-shadow: 0 4px 12px rgba(26, 54, 93, 0.25);
  }

  &.Mui-disabled {
    background-color: #a0aec0; /* palette.text.disabled */
  }
`;
