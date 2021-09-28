import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        ':host ::ng-deep .ck-editor__editable_inline': {
          'min-height': '500px',
        },
      },
    },
  },
});

export default theme;
