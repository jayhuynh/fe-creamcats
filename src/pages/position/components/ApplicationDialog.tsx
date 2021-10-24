import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { fromApplications, fromAuth, fromNotifications, fromProfile, useAppDispatch } from '../../../store';
import { NotificationsType } from '../../../store/notificationsSlice';
import { login, useNavigate, useQuery } from '../../../routes';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 !important',
  },
  maxSize: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    height: 0,
  },
}));


interface ApplicationFormInput {
  email: string;
  notes: string;
}

interface ApplicationDialogProps {
  postionId: number;
}

const ApplicationDialog = ({ postionId }: ApplicationDialogProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useSelector(fromProfile.selectProfile);
  const { replaceQuery, navigate, replace } = useNavigate();
  const  isAuthenticated = useSelector(fromAuth.selectIsAuthenticated);
  const { get, clear, queryString, queryDictionary } = useQuery();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormInput>({
    defaultValues: { email: profile?.email, notes: '' },
  });

  const handleClickOpen = () => {
    (async () => {
      if (!isAuthenticated) {
        navigate(
          login.path,
          replaceQuery({ redirect: `${location.pathname}?${queryString()}` }),
        );
      }
      const accountType = JSON.parse(localStorage.getItem(fromAuth.TYPE) || 'volunteer');
      await dispatch(fromAuth.doResume(undefined));
      await dispatch(fromProfile.doFetchMyProfile({ type: accountType }));
      setOpen(true);
    })();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doSubmitApplication = async ({ notes }: ApplicationFormInput) => {
    await dispatch(fromApplications.doCreateApplication({
      application: {
        userId: profile?.id || -1,
        positionId: postionId,
        notes: notes,
      },
    }));
    handleClose();
    dispatch(fromNotifications.doPushNotification({
      message: 'Successfully applied to this position',
      key: new Date().getTime(),
      type: NotificationsType.SUCCESS,
    }));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        REGISTER
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <img
                className={classes.maxSize}
                src="https://i.ibb.co/jH3P4H0/Screen-Shot-2021-08-27-at-2-42-37-am.png"
                alt="Screen-Shot-2021-08-27-at-2-42-37-am"/>
            </Grid>
            <Grid item xs={6}>
                <form onSubmit={handleSubmit(doSubmitApplication)} className={classes.maxSize}>
                  <Grid
                    alignItems="center"
                    container
                    justifyContent="center"
                    className={classes.maxSize}
                    direction="column">
                    <Box width={0.70}>
                      <TextField
                        variant="outlined"
                        label="Email"
                        margin="normal"
                        fullWidth
                        disabled
                        {...register('email')}
                        error={!!errors.email}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box width={0.70} mt={2}>
                    <TextField
                      variant="outlined"
                      label="Notes"
                      multiline
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      rows={4}
                    />
                    </Box>
                    <Box width={0.70} mt={2}>
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary">
                        APPLY NOW
                      </Button>
                    </Box>
                  </Grid>
                </form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationDialog;
