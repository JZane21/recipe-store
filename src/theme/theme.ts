import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5800FF',
    },
    secondary: {
      main: '#0096FF'
    },
    success:{
      main: '#72FFFF'
    },
    error: {
      main: '#dc2626'
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4700D8',
    },
    secondary: {
      main: '#9900F0'
    },
    success:{
      main: '#F900BF'
    },
    error: {
      main: '#dc2626'
    }
  }
});