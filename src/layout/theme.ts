import { createTheme } from '@material-ui/core';
import { light } from '@material-ui/core/styles/createPalette';

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: 'bold',
    },
  },
  palette: {
    primary: {
      light: '#fa6980',
      main: '#fa6980',
      dark: '#fa6980',
    },
    secondary: {
      light: '#ff4081',
      main: '#fa6980',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        ':host ::ng-deep .ck-editor__editable_inline': {
          'min-height': '500px',
        },
        '.MuiButton-containedPrimary': {
          color: '#ffffff',
        },
        '.MuiPaginationItem-textPrimary': {
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
