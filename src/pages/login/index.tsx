import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, TextField, Checkbox, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';

import { fromAuth, useAppDispatch } from '../../store';

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

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doLogin = async ({ email, password, rememberMe }: LoginFormInputs) => {
    const formattedEmail = email.toLowerCase();
    await dispatch(fromAuth.doLogin({ credential: { email: formattedEmail, password }, rememberMe }));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}>
        REGISTER
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.closeButton}>
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
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
                          <Typography>LOGIN</Typography>
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
            </Grid>
            <Grid item xs={6}>
              <img
                className={classes.maxSize}
                src="https://i.ibb.co/M8gxHJT/Screen-Shot-2021-09-01-at-1-05-49-am.png"
                alt="Screen-Shot-2021-08-27-at-2-42-37-am"/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
