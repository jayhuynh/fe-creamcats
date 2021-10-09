import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { fromAuth, useAppDispatch } from '../../../store';
import { CcDatePicker } from '../../../utils';

export interface VolunteerProfileInputForm {
  avatar: String;
  firstName: String;
  lastName: String;
  dateOfBirth: Date;
  gender: String;
}

const useStyle = makeStyles({
  input: {
    display: 'none',
  },
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateVolunteerProfile(props: any) {
  const classes = useStyle();

  const registerInfo = useSelector(fromAuth.selectRegister);
  const volunteerProfile = useSelector(fromAuth.selectVolunteerProfile);
  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit, setValue } =
    useForm<VolunteerProfileInputForm>({
      defaultValues: volunteerProfile,
    });

  const onSubmit = (data: VolunteerProfileInputForm) =>
    console.log({ ...registerInfo, ...data });

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromAuth.doChangeVolunteerProfile(value));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography>Thanks! Now setup Your Profile</Typography>
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
                    <Typography>First name</Typography>
                    <TextField
                      required
                      type="text"
                      {...register('firstName')}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Typography>Last name</Typography>
                    <TextField required type="text" {...register('lastName')} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Date of birth</Typography>
                <CcDatePicker
                  {...register('dateOfBirth')}
                  value={watch('dateOfBirth')}
                  onChange={(date: MaterialUiPickersDate) =>
                    setValue('dateOfBirth', date?.toDate() || new Date())
                  }
                  animateYearScrolling
                />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Gender</Typography>
                <Select
                  labelId="genderSelectLabel"
                  id="genderSelect"
                  defaultValue={''}
                  label="Gender"
                  {...register('gender')}
                >
                  <MenuItem value="">Absent</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </Grid>
            </Grid>
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
