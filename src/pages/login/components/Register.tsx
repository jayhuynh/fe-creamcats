import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
} from '@material-ui/core';

interface RegisterInputForm {
  type: String;
  phone: String;
  email: String;
  password: String;
  confirmPassword: String;
}

const useStyle = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function Register(props: any) {
  const classes = useStyle();

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
      props.setRegisterType(value.type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography>Hello! Welcome back to our platform.</Typography>
          <Typography>Register Here</Typography>
        </Grid>
        <Grid item>
          <Controller
            control={control}
            defaultValue={getValues('type')}
            name="type"
            render={({ field }) => (
              <RadioGroup {...field}>
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
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Phone</Typography>
                <TextField required type="tel" {...register('phone')} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Email</Typography>
                <TextField required type="email" {...register('email')} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Password</Typography>
                <TextField required type="text" {...register('password')} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Confirm password</Typography>
                <TextField
                  required
                  type="text"
                  {...register('confirmPassword')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
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
