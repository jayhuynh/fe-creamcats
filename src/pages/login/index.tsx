import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, TextField, Checkbox } from '@material-ui/core';

import { fromAuth, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

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
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(fromAuth.selectIsAuthenticated);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  const doLogin = async ({ email, password, rememberMe }: LoginFormInputs) => {
    const formattedEmail = email.toLowerCase();
    await dispatch(fromAuth.doLogin({ credential: { email: formattedEmail, password }, rememberMe }));
  };

  return (
    <>
      <div>{isAuthenticated ? 'Authenticated' : 'Login'}</div>
      <form onSubmit={handleSubmit(doLogin)}>
        <TextField
          variant="outlined"
          fullWidth
          required
          type="email"
          autoComplete="email"
          autoFocus
          label="Email"
          {...register('email')}
          error={!!errors.email}
        />
        <TextField
          variant="outlined"
          fullWidth
          required
          type="password"
          autoComplete="current-password"
          label="Password"
          {...register('password')}
          error={!!errors.password}
        />
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
        <Button variant="contained" size="large" color="primary" type="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
