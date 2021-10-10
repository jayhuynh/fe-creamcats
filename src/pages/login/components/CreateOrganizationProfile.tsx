import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStyle } from '../components/Login';
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';

interface OrganizationProfileInputForm {
  avatar: String;
  name: String;
  address: String;
  description: String;
}

const useStyles = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
});

export default function CreateOrganizationProfile(props: any) {
  const classes = useStyles();
  const loginCls = useStyle();
  const { register, watch, handleSubmit, control, getValues } =
    useForm<OrganizationProfileInputForm>({
      defaultValues: {
        avatar: '',
        name: '',
        address: '',
        description: '',
      },
    });

  const onSubmit = (data: OrganizationProfileInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      //   console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6}>
        <Grid item spacing={6} style={{ margin:'10vh auto 0', fontFamily:'HelveticaNeue' }}>
          <Typography style={{ fontSize:36, fontWeight:'bold' }}>Thanks! Now setup</Typography>
          <Typography style={{ fontSize:55, fontWeight:'bold', color:'#fa6980' }}>Your Page</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item></Grid>
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
          <Button type="submit">Continue</Button>
        </Grid>
      </Grid>
    </form>
  );
}
