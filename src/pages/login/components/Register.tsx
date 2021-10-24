import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStyle } from '../components/Login';

import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
  Box,
} from '@material-ui/core';
import { fromAuth, useAppDispatch } from '../../../store';

export interface RegisterInputForm {
  type: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const useStyles = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function Register(props: any) {
  const classes = useStyles();
  const loginCls = useStyle();
  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<RegisterInputForm>({
      defaultValues: {
        type: props.registerType,
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    });

  const onSubmit = (data: RegisterInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromAuth.doChangeRegister(value));
      props.setRegisterType(value.type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6} style={{ width:'60vw',  margin:'0 auto 0', fontFamily:'HelveticaNeue' }}>
        <Grid item>
          <Typography style={{ fontSize:36, fontWeight:'bold' }}>Hello! Welcome back to our platform.</Typography>
          <Typography style={{ fontSize:48, fontWeight:'bold', color:'#fa6980' }}>Register Here</Typography>
        </Grid>
        <Grid item>
          <Controller
            control={control}
            defaultValue={getValues('type')}
            name="type"
            render={({ field }) => (
              <RadioGroup {...field} className={loginCls.radio}>
                <FormControlLabel
                  value="Volunteer"
                  control={<Radio />}
                  label="Volunteer"
                />
                <FormControlLabel
                  value="Organization"
                  control={<Radio />}
                  label="Organization"
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item style={{ paddingLeft:36 }}>
          <Grid container direction="row" spacing={4}>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Phone</Typography>
                <TextField className={loginCls.input} variant="outlined" required type="tel" {...register('phone')} />
              </Grid>
            </Grid>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Email</Typography>
                <TextField className={loginCls.input} variant="outlined" required type="email" {...register('email')} />
              </Grid>
            </Grid>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Password</Typography>
                <TextField className={loginCls.input} variant="outlined" required type="text" {...register('password')} />
              </Grid>
            </Grid>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2}>
                <Typography className={loginCls.bold}>Confirm password</Typography>
                <TextField
                  required
                  className={loginCls.input}
                  variant="outlined"
                  type="text"
                  {...register('confirmPassword')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ display:'flex', alignItems:'flex-end', padding:'0 66px 0 16px', marginTop:'10vh' }}>
        <Box style={{ flex:1 }}></Box>
          <Button
          className={loginCls.login}
          color="primary"
          variant="contained"
            onClick={() => {
              props.setTab(1);
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
