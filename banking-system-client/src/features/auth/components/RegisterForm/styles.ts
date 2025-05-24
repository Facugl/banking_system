import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';

export const RegisterContainer = styled(Box)`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background-color: white;
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

export const RegisterTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a365d;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #b8a369;
    border-radius: 2px;
  }
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 1.2rem;

  .MuiOutlinedInput-root {
    border-radius: 8px;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #b8a369;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #1a365d;
      border-width: 2px;
    }
  }

  .MuiInputLabel-root.Mui-focused {
    color: #1a365d;
  }
`;

export const RegisterButton = styled(Button)`
  margin-top: 1.5rem;
  padding: 0.8rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: #1a365d;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2c5282;
    box-shadow: 0 4px 12px rgba(26, 54, 93, 0.25);
  }

  &.Mui-disabled {
    background-color: #a0aec0;
  }
`;

export const ErrorMessage = styled(Typography)`
  color: #e53e3e;
  margin: 0.5rem 0;
  font-size: 0.875rem;
`;

export const LoginPrompt = styled(Typography)`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4a5568;
  text-align: center;

  a {
    color: #1a365d;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
      color: #2c5282;
    }
  }
`;
