import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Profile } from '../../../../../models';
import { OrganizationApplicationService } from '../../../../../services';

const useStyles = makeStyles(() => ({
  card: {
    padding: 50,
    width: 667,
    textAlign: 'left',
    fontFamily: 'HelveticaNeue',
    position:'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202124',
    marginBottom: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    width: '100%',
    height: 16,
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal',
    color: '#a6adb4',
    marginBottom: 7,
  },
  content: {
    width: '100%',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: 'normal',
    color: '#333',
    marginTop: 12,
    wordBreak: 'break-word',
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#bfc4c9',
    marginBottom: 20,
  },
  close:{
    position:'absolute',
    color:'#bfc4c9',
    right:30,
    top:30,
    cursor:'pointer',
    fontSize:22,
  },
}));

interface ApplicationInfoProps {
  applicationInformation: {
    isOpen: boolean;
    data: any;
  };
  handlerCloseApplication: () => void;
}

export const ApplicationInfo = ({ applicationInformation, handlerCloseApplication }: ApplicationInfoProps) => {
  const classes = useStyles();
  const { data } = applicationInformation;
  const [applicantDetails, setApplicantDetails] = useState<Profile>();

  useEffect(() => {
    (async () => {
      setApplicantDetails(await OrganizationApplicationService.getApplicantDetails(data.applicantId));
    })();
  }, [data]);


  return (
    <Dialog
      maxWidth="md"
      open={applicationInformation.isOpen}
      onClose={handlerCloseApplication}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Box className={classes.card}>
          <Box className={classes.title}>{data.name}</Box>
          <Grid container>
            <Grid item xs={6}>
              <Avatar
                src={applicantDetails?.profilePic}
                className={classes.avatar} />
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.name}>Gender</Typography>
                  <Typography className={classes.content}>{data.gender}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.name}>Age</Typography>
                  <Typography className={classes.content}>{applicantDetails?.age}</Typography>
                </Grid>
              </Grid>
              <Typography className={classes.name}>Phone number</Typography>
              <Typography className={classes.content}>+41 8982 1221</Typography>
              <Typography className={classes.name}>Email</Typography>
              <Typography className={classes.content}>{applicantDetails?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.content} style={{ marginBottom:7 }}>Joined Work</Typography>
              <Typography className={classes.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non nunc at turpis posuere mollis eu eu
                purus. Nam sed euismod diam. In diam lectus, lobortis vitae elit vitae, scelerisque pellentesque velit.
                Suspendisse id \mollis est, sed placerat odio. Sed eu leo non diam scelerisque maximus.
              </Typography>
              <Typography className={classes.content} style={{ marginBottom:7 }}>Notes</Typography>
              <Typography className={classes.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non nunc at turpis posuere mollis eu eu
                purus. Nam sed euismod diam. In diam lectus, lobortis vitae elit vitae, scelerisque pellentesque velit.
                Suspendisse id \mollis est, sed placerat odio. Sed eu leo non diam scelerisque maximus.
              </Typography>
            </Grid>
          </Grid>
          <Box
            onClick={event => {handlerCloseApplication();}}
            className={classes.close}>x</Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationInfo;
