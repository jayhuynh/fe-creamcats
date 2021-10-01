import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Grid,
  Typography,
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
} from '@material-ui/core';

interface LoginInputForm {
  type: String;
  email: String;
  password: String;
  rememberMe: Boolean;
}

const useStyle = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function Login() {
  const classes = useStyle();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<LoginInputForm>({
      defaultValues: {
        type: 'Volunteer',
        email: '',
        password: '',
        rememberMe: false,
      },
    });

  const onSubmit = (data: LoginInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography>Hello! Welcome back to our platform.</Typography>
          <Typography>Login Here</Typography>
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
                <Typography>Email</Typography>
                <TextField required type="email" {...register('email')} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Password</Typography>
                <TextField required type="password" {...register('password')} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Checkbox defaultChecked={false} {...register('rememberMe')} />
          Remember me
        </Grid>
        <Grid item>
          <Button>Register now</Button>
          <Button>Forget password?</Button>
          <Button type="submit">Login</Button>
        </Grid>
      </Grid>
    </form>
  );
}
