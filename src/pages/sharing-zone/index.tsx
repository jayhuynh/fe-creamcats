import { FormControl, InputLabel, Select, MenuItem, Grid, Box, Typography } from '@material-ui/core';
import Organisation from './components/Organisation';
import Event from './components/Event';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  wrap:{
    fontFamily:'HelveticaNeue !important',
    '& .MuiTypography-body1':{
      fontFamily:'HelveticaNeue !important',
    },
  },
  sort:{
    '& .MuiOutlinedInput-input':{
      padding:'11px 14px',
    },
    '& .MuiInputLabel-outlined':{
      transform: 'translate(14px, 14px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink' :{
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
  title: {
    color: '#fa6980',
    fontSize: '18px',
    padding: '0 0 10px',
    margin: '0 40px 30px',
    borderBottom: 'solid 1px #bfc4c9',
    fontWeight: 'bold',
  },
}));
const testImg =
  'https://images.unsplash.com/photo-1622389084799-e2343c893b8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80';

const SharingZone = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrap} style={{ background: '#f6f8f9', padding: '10px 150px' }}>
      <FormControl className={classes.sort} variant="outlined" style={{ minWidth:140, marginBottom:30 }}>
        <InputLabel id="demo-simple-select-outlined-label" style={{ fontWeight:'bold' }}>Sort By</InputLabel>
        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Sort By">
          <MenuItem value={10}>Latest</MenuItem>
          <MenuItem value={20}>Most Viewed</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Event
            images={testImg}
            desc=" Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
        voluptartem accusantium "
          ></Event>
          <Event images={testImg}></Event>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.title}>Organisations</Typography>
          <Organisation images={testImg} organisation></Organisation>
          <Organisation images={testImg} organisation></Organisation>
          <Typography className={classes.title} style={{ marginTop: 60 }}>
            Most popular posts
          </Typography>
          <Organisation images={testImg}></Organisation>
          <Organisation images={testImg}></Organisation>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SharingZone;
