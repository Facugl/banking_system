import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const RegisterPageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7fafc;
  background-image: linear-gradient(135deg, #f0f4f8 0%, #f7fafc 100%);
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const RegisterBackground = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
