import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledLogoutButton = styled(Button)`
  background-color: #b8a369;
  color: white;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #9a8555;
    box-shadow: 0 4px 8px rgba(184, 163, 105, 0.3);
  }

  &.Mui-disabled {
    background-color: #d6c48c;
    color: rgba(255, 255, 255, 0.7);
  }
`;
