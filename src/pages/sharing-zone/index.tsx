import { FormControl, InputLabel, Select, MenuItem, Grid, Box, Typography } from '@material-ui/core';
import Organisation from './components/Organisation';
import Event from './components/Event';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { fromApplications, fromPosts, useAppDispatch } from '../../store';
import { useEffect } from 'react';
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
  const posts = useSelector(fromPosts.selectPosts);
  const dispatch = useAppDispatch();
  const highlight = posts.slice(-2);
  console.log(highlight);

  useEffect(() => {
    dispatch(fromPosts.doFetchPosts());
  }, [dispatch]);


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
          { posts.map(post => (
            <Event post={post}></Event>
          ))}
        </Grid>
        <Grid item xs={5}>
          {/*<Typography className={classes.title}>Organisations</Typography>*/}
          {/*<Organisation images={testImg} organisation></Organisation>*/}
          {/*<Organisation images={testImg} organisation></Organisation>*/}
          <Typography className={classes.title}>
            Most popular posts
          </Typography>
          { highlight.map(post => (
            <Organisation post={post}></Organisation>
          )) }
        </Grid>
      </Grid>
    </Box>
  );
};

export default SharingZone;
