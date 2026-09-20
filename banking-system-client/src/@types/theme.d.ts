import { Theme as MuiTheme } from '@mui/material/styles';

export interface CustomShadows {
  card: string;
  buttonHover: string;
  modal: string;
}

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    customShadows: CustomShadows;
  }

  interface ThemeOptions {
    customShadows?: CustomShadows;
  }

  interface TypeBackground {
    sidebar: string;
  }
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    customShadows: CustomShadows;
  }
}
