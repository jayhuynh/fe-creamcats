import { Grid, Card, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const questionMark =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png';

const useStyles = makeStyles(() => ({
  personalInformationsCard: {
    backgroundColor: 'white',
    height: 633,
    paddingTop: 43,
    boxShadow: 'none',
  },
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 20,
    border: '3px solid #fa6980',
  },
  personalInformationTitle: {
    width: '100%',
    height: 16,
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#a6adb4',
    marginBottom: 7,
  },
  personalInformationContent: {
    width: '100%',
    height: 28,
    fontFamily: 'HelveticaNeue',
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#333',
  },
  editProfileButton: {
    backgroundColor: '#fa6980',
    color: 'white',
  },
}));

export default function PersonalInformation(props: any) {
  const classes = useStyles();
  const { avatar, fullname, gender, age } = props.personalInformations;

  return (
    <Grid item xs={3}>
      <Card className={classes.personalInformationsCard}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <Grid item xs>
            <Avatar
              className={classes.avatar}
              alt={typeof fullname === 'undefined' ? 'Unknown' : fullname}
              src={
                //Default a question mark if no URL for avatar
                typeof avatar === 'undefined' ? questionMark : avatar
              }
            />
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>
              Name
            </Typography>
            <Typography className={classes.personalInformationContent}>
              {fullname}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>
              Gender
            </Typography>
            <Typography className={classes.personalInformationContent}>
              {gender}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>
              Age
            </Typography>
            <Typography className={classes.personalInformationContent}>
              {age}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>
              Joined Work
            </Typography>
            <Typography className={classes.personalInformationContent}>
              45
            </Typography>
          </Grid>
          <Grid item xs>
            <Button className={classes.editProfileButton}>EDIT PROFILE</Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
