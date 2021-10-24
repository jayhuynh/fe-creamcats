import { PropsWithChildren } from 'react';
import { Box, FormControl, Grid, Typography } from '@material-ui/core';

interface OptionContainerInputs {
  label: string
  quickClear?: boolean
}

const OptionContainer = ({
  label,
  quickClear = false,
  ...rest
}: PropsWithChildren<OptionContainerInputs>) => (
  <FormControl fullWidth>
    <Box mt={2} mb={1}>
      <Grid
        container>
        <Grid container xs={6} justifyContent="flex-start" alignItems="center">
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
        { quickClear ?
          <Grid container xs={6} justifyContent="flex-end" alignItems="center">
            <Typography color="primary" variant="caption">Clear</Typography>
          </Grid> : null
        }
      </Grid>
    </Box>
    {rest.children}
  </FormControl>
);

export default OptionContainer;
