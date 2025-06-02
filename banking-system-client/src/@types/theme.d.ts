import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    customShadows?: {
      card?: string;
      buttonHover?: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      card?: string;
      buttonHover?: string;
    };
  }

  interface TypeBackground {
    sidebar: string;
  }
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
