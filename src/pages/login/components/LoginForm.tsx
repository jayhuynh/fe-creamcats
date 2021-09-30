import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import { fromAuth, fromProfile, useAppDispatch } from '../../../store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 !important',
  },
  maxSize: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    height: 0,
  },
}));

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  const doLogin = async ({ email, password, rememberMe }: LoginFormInputs) => {
    const formattedEmail = email.toLowerCase();
    await dispatch(fromAuth.doLogin({ credential: { email: formattedEmail, password, type: 'volunteer' }, rememberMe }));
    await dispatch(fromProfile.doFetchProfile());
  };

  return (
    <form onSubmit={handleSubmit(doLogin)} className={classes.maxSize}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.maxSize}
      >
        <Box width={0.70}>
          <TextField
            variant="outlined"
            fullWidth
            required
            type="email"
            margin="normal"
            autoComplete="email"
            autoFocus
            label="Email"
            {...register('email')}
            error={!!errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box width={0.70}>
          <TextField
            variant="outlined"
            fullWidth
            required
            type="password"
            margin="normal"
            autoComplete="current-password"
            label="Password"
            {...register('password')}
            error={!!errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={2} width={0.70}>
          <Grid
            container>
            <Grid container xs={6} justifyContent="flex-start" alignItems="center">
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    {...register('rememberMe')}
                    defaultChecked
                  />
                )}
                label="Remember me"
              />
            </Grid>
            <Grid container xs={6} justifyContent="flex-end" alignItems="center">
              <Button
                variant="contained"
                type="submit"
                color="secondary">
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2} width={0.70}>
          <Grid
            container>
            <Grid container xs={6} justifyContent="flex-start" alignItems="center">
              <Typography color="secondary">Register now</Typography>
            </Grid>
            <Grid container xs={6} justifyContent="flex-end" alignItems="center">
              <Typography>Forgot password?</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
};

export default LoginForm;
