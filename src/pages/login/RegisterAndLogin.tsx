import { useState } from 'react';

import {
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import Login from './components/Login';
import RegisterTabWrapper from './components/RegisterTabWrapper';

export default function RegisterAndLogin() {
  const [currentTab, setTab] = useState('register');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTab((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="tab"
              value={currentTab}
              onChange={handleChange}
            >
              <FormControlLabel
                value="login"
                control={<Radio />}
                label="Login"
              />
              <FormControlLabel
                value="register"
                control={<Radio />}
                label="Register"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          {currentTab === 'login' ? (
            <Login goRegister={setTab} />
          ) : (
            <RegisterTabWrapper />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
