import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {}
  interface ThemeOptions {}
}

declare module '@emotion/styled' {
  export interface Theme extends MuiTheme {}
}
