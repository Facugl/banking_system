import styled from '@emotion/styled';
import { AppBar, Box, Container, Toolbar, BoxProps } from '@mui/material';

interface MainContentProps extends BoxProps {
  component?: React.ElementType;
}

export const DashboardRoot = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #f7fafc;
`;

export const StyledAppBar = styled(AppBar)`
  z-index: 1201;
  background-color: white;
  color: #1a365d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media (min-width: 600px) {
    padding: 0 1.5rem;
  }
`;

export const MainContent = styled(Box)<MainContentProps>`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 960px) {
    padding: 1.5rem;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const ContentContainer = styled(Container)`
  padding-top: 1.5rem;

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
