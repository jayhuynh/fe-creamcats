import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStyle } from '../components/Login';
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';

interface VolunteerProfileInputForm {
  avatar: String;
  firstName: String;
  lastName: String;
  dateOfBirth: Date;
  gender: String;
}

const useStyles = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateVolunteerProfile(props: any) {
  const classes = useStyles();
  const loginCls = useStyle();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<VolunteerProfileInputForm>({
      defaultValues: {
        avatar: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
      },
    });

  const onSubmit = (data: VolunteerProfileInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      // console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6} style={{ width:'60vw',  margin:'0 auto 0', fontFamily:'HelveticaNeue' }}>
        <Grid item>
          <Typography style={{ fontSize:36, fontWeight:'bold' }}>Thanks! Now setup&nbsp;
          <Box style={{ fontSize:48, fontWeight:'bold', color:'#fa6980', display:'inline' }}>Your Profile</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item></Grid>
            <Grid item>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography className={loginCls.bold}>First name</Typography>
                    <TextField
                      required
                      className={loginCls.input} variant="outlined" 
                      type="text"
                      {...register('firstName')}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography className={loginCls.bold}>Last name</Typography>
                    <TextField className={loginCls.input} variant="outlined" required type="text" {...register('lastName')} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Date of birth</Typography>
                <TextField className={loginCls.input} variant="outlined" required type="text" {...register('dateOfBirth')} />
              </Grid>
            </Grid>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Gender</Typography>
                <TextField className={loginCls.input} variant="outlined" required type="text" {...register('gender')} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              props.setTab(0);
            }}
          >
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
