import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Fade, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FilterList } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Filters from './Filters';

const TitleContainer = () => {
  const [open, setOpen] = useState(false);
  const handleSwitch = () => setOpen(!open);

  return (
    <Box mt={6} mb={3}>
      <Grid
        container>
        <Grid container xs={6} justifyContent="flex-start" alignItems="center">
          <Typography variant="h5">OPPORTUNITIES</Typography>
        </Grid>
        <Grid container xs={6} justifyContent="flex-end" alignItems="center">
          <Button
            startIcon={<FilterList/>}
            variant="outlined"
            onClick={handleSwitch}>Filters</Button>
        </Grid>
      </Grid>
      <Fade in={open} mountOnEnter unmountOnExit timeout={300}>
        <Filters/>
      </Fade>
    </Box>
  );
};

export default TitleContainer;
