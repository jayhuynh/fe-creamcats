import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';

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

export const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
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
              <Box className={classes.closeButton}>
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <LoginForm/>
            </Grid>
            <Grid item xs={6}>
              <img
                className={classes.maxSize}
                src="https://i.ibb.co/M8gxHJT/Screen-Shot-2021-09-01-at-1-05-49-am.png"
                alt="Screen-Shot-2021-08-27-at-2-42-37-am"/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
