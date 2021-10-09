import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';

interface VolunteerProfileInputForm {
  avatar: String;
  firstName: String;
  lastName: String;
  dateOfBirth: Date;
  gender: String;
}

const useStyle = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateVolunteerProfile(props: any) {
  const classes = useStyle();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<VolunteerProfileInputForm>({
      defaultValues: {
        avatar: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
      },
    });

  const onSubmit = (data: VolunteerProfileInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      // console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography>Thanks! Now setup Your Profile</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item></Grid>
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
                <TextField required type="text" {...register('dateOfBirth')} />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Typography>Gender</Typography>
                <TextField required type="text" {...register('gender')} />
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
          <Button type="submit">Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
