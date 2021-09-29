import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ApplicationSearchArea from '../profile/components/applications/ApplicationSearchArea';
import ApplicationTable from '../profile/components/applications/ApplicationTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa6980',
    },
    secondary: {
      main: '#bfc4c9',
    },
  },
});

export default function Test() {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="column" spacing={4} alignItems="flex-start">
        <ApplicationSearchArea />
        <ApplicationTable />
      </Grid>
    </MuiThemeProvider>
  );
}
