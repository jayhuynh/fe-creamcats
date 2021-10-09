import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { fromAuth, useAppDispatch } from '../../../store';

import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export interface OrganizationProfileInputForm {
  avatar: String;
  name: String;
  address: String;
  description: String;
}

const useStyle = makeStyles({
  input: {
    display: 'none',
  },
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateOrganizationProfile(props: any) {
  const classes = useStyle();

  const registerInfo = useSelector(fromAuth.selectRegister);
  const organizationProfile = useSelector(fromAuth.selectOrganizationProfile);
  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<OrganizationProfileInputForm>({
      defaultValues: organizationProfile,
    });

  const onSubmit = (data: OrganizationProfileInputForm) =>
    console.log({ ...registerInfo, ...data });

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromAuth.doChangeOrganizationProfile(value));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography>Thanks! Now setup Your Page</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography>Set your avatar</Typography>
                </Grid>
                <Grid item>
                  {/* Not completed. Save the url to Redux store after integrate the AWS3 API */}
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography>Organisation name</Typography>
                    <TextField required type="text" {...register('name')} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography>Address</Typography>
                    <TextField required type="text" {...register('address')} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Typography>Description</Typography>
            <TextField required type="text" {...register('description')} />
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
          <Button type="submit">Register</Button>
        </Grid>
      </Grid>
    </form>
  );
}
