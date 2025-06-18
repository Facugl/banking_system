import styled from '@emotion/styled';
import {
  Drawer,
  ListItemButton,
  Toolbar,
  Typography,
  TypographyProps,
  ListItemButtonProps,
} from '@mui/material';

export const StyledDrawer = styled(Drawer)`
  width: 260px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 260px;
    box-sizing: border-box;
    background-color: #f0f4f8;
    border-right: 1px solid #e2e8f0;
  }
`;

export const LogoContainer = styled(Toolbar)`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandName = styled(Typography)<TypographyProps>`
  font-weight: 700;
  color: #1a365d;
  font-size: 1.25rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1rem;
  }

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: #b8a369;
    border-radius: 2px;
  }
`;

interface StyledListItemProps extends ListItemButtonProps {
  isActive?: boolean;
  to?: string;
}

export const StyledListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<StyledListItemProps>`
  margin: 0.5rem 0.75rem;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;

  ${({ isActive }) =>
    isActive
      ? `
    background-color: rgba(26, 54, 93, 0.08);
    border-left: 4px solid #1A365D;

    .MuiListItemIcon-root {
      color: #1A365D;
    }

    .MuiTypography-root {
      font-weight: 600;
      color: #1A365D;
    }
  `
      : `
    &:hover {
      background-color: rgba(26, 54, 93, 0.05);
    }
  `}

  .MuiListItemIcon-root {
    color: #4a5568;
    min-width: 40px;
  }

  .MuiTypography-root {
    font-size: 0.95rem;
    color: #2d3748;
  }
`;
