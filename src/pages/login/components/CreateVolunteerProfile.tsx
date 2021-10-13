import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStyle } from '../components/Login';
import { useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  Box,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { fromAuth, fromProfile, useAppDispatch } from '../../../store';
import { CcDatePicker } from '../../../utils';
import moment from 'moment';

export interface VolunteerProfileInputForm {
  avatar: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
}

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

export default function CreateVolunteerProfile(props: any) {
  const classes = useStyles();
  const loginCls = useStyle();

  const registerInfo = useSelector(fromAuth.selectRegister);
  const volunteerProfile = useSelector(fromAuth.selectVolunteerProfile);
  const dispatch = useAppDispatch();
  const { register, watch, handleSubmit, setValue } =
        useForm<VolunteerProfileInputForm>({
          defaultValues: volunteerProfile,
        });

  const onSubmit = async (data: VolunteerProfileInputForm) => {
    const info = { ...registerInfo, ...data };
    const credential = {
      email: info.email,
      password: info.password,
      type: info.type.toLowerCase(),
    };

    const profile = {
      fullname: `${info.firstName} ${info.lastName}`,
      age: moment().diff(info.dateOfBirth, 'years'),
      gender: info.gender,
      profilePic: 'url',
    };


    console.log(credential.type);
    await dispatch(fromAuth.doRegister({ credential, profile }));
    await dispatch(fromProfile.doFetchMyProfile({ type: credential.type }));
  };

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromAuth.doChangeVolunteerProfile(value));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" spacing={6}
                  style={{ width: '60vw', margin: '0 auto 0', fontFamily: 'HelveticaNeue' }}>
                <Grid item>
                    <Typography style={{ fontSize: 36, fontWeight: 'bold' }}>Thanks! Now setup&nbsp;
                        <Box style={{ fontSize: 48, fontWeight: 'bold', color: '#fa6980', display: 'inline' }}>Your
                            Profile</Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={4}>
                        <Grid item style={{ width: '47%', padding: '0 24px' }}>
                            <Grid container direction="column" spacing={2}>
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
                                            <PhotoCamera/>
                                        </IconButton>
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ width: '47%' }}>
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
                                        <TextField className={loginCls.input} variant="outlined" required
                                                   type="text" {...register('lastName')} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ marginTop: 22, paddingLeft: 32 }}>
                    <Grid container direction="row" spacing={4}>
                        <Grid item style={{ width: '47%' }}>
                            <Grid container direction="column" spacing={2}>
                                <Typography className={loginCls.bold}>Date of birth</Typography>

                                <CcDatePicker
                                    style={{ marginTop: 12, backgroundColor: 'white' }}
                                    {...register('dateOfBirth')}
                                    value={watch('dateOfBirth')}
                                    onChange={(date: MaterialUiPickersDate) =>
                                      setValue('dateOfBirth', date?.toDate() || new Date())
                                    }
                                    animateYearScrolling
                                />
                            </Grid>
                        </Grid>
                        <Grid item style={{ width: '47%' }}>
                            <Grid container direction="column" spacing={2}>
                                <Typography className={loginCls.bold}>Gender</Typography>
                                <Select
                                    className={loginCls.input} variant="outlined"
                                    labelId="genderSelectLabel"
                                    id="genderSelect"
                                    defaultValue={'male'}
                                    {...register('gender')}
                                >
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item
                      style={{ display: 'flex', alignItems: 'flex-end', padding: '0 66px 0 16px', marginTop: '10vh' }}>
                    <Box style={{ flex: 1 }}></Box>
                    <Button
                        className={loginCls.back}
                        onClick={() => {
                          props.setTab(0);
                        }}
                    >
                        Back
                    </Button>
                    <Button className={loginCls.login}
                            color="secondary"
                            variant="contained" type="submit">Continue</Button>
                </Grid>
            </Grid>
        </form>
  );
}
