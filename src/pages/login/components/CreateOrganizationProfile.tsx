import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStyle } from '../components/Login';
import { useSelector } from 'react-redux';

import { fromAuth, fromProfile, useAppDispatch } from '../../../store';

import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import moment from 'moment';
export interface OrganizationProfileInputForm {
  avatar: string;
  name: string;
  address: string;
  description: string;
}

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateOrganizationProfile(props: any) {
  const classes = useStyles();
  const loginCls = useStyle();
  const registerInfo = useSelector(fromAuth.selectRegister);
  const organizationProfile = useSelector(fromAuth.selectOrganizationProfile);
  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<OrganizationProfileInputForm>({
      defaultValues: organizationProfile,
    });

  const onSubmit = async (data: OrganizationProfileInputForm) => {
    const info = { ...registerInfo, ...data };
    const credential = {
      email: info.email,
      password: info.password,
      type: info.type.toLowerCase(),
    };

    const profile = {
      name: info.name,
      addess: info.address,
      email: info.email,
      phone: info.phone,
      description: info.phone,
    };
    console.log(credential.type);
    await dispatch(fromAuth.doRegister({ credential, profile }));
    await dispatch(fromProfile.doFetchMyProfile({ type: credential.type }));

  };

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromAuth.doChangeOrganizationProfile(value));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6} style={{ width:'60vw', margin:'0 auto 0', fontFamily:'HelveticaNeue' }}>
        <Grid item spacing={6} >
          <Typography style={{ fontSize:36, fontWeight:'bold' }}>Thanks! Now setup&nbsp;
          <Box style={{ fontSize:48, fontWeight:'bold', color:'#fa6980', display:'inline' }}>Your Page</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
          <Grid item style={{ width: '47%', padding:'0 24px' }}>
              <Grid item>
                  <Typography className={loginCls.bold}>Set your avatar</Typography>
                </Grid>
                <Grid item className={loginCls.imgBtn}>
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
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography className={loginCls.bold}>Organisation name</Typography>
                    <TextField  className={loginCls.input} variant="outlined"  required type="text" {...register('name')} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography className={loginCls.bold}>Address</Typography>
                    <TextField  className={loginCls.input} variant="outlined"  required type="text" {...register('address')} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ width: '94%', paddingLeft:32 }}>
          <Grid container direction="column" spacing={2} >
            <Typography className={loginCls.bold} >Description</Typography>
            <TextField  className={loginCls.input} multiline rows={3} variant="outlined"  required type="text" {...register('description')} />
          </Grid>
        </Grid>
        <Grid item style={{ display:'flex', alignItems:'flex-end', padding:'0 66px 0 16px', marginTop:'5vh' }}>
        <Box style={{ flex:1 }}></Box>
        <Button
        className={loginCls.back}
            onClick={() => {
              props.setTab(0);
            }}
          >
            Back
          </Button>
          <Button
          className={loginCls.login}
          color="primary"
          variant="contained"
          type="submit">Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
