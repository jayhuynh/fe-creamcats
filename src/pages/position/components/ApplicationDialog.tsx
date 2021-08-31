import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

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
  fullName: string;
  phoneNumber: string;
  notes: string;
}

const ApplicationDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormInput>({
    defaultValues: { email: '', fullName: '', phoneNumber: '', notes: '' },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doSubmitApplication = async () => {
    console.log('Submitted');
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box width={0.70}>
                    <TextField
                      variant="outlined"
                      label="Full name"
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    </Box>
                    <Box width={0.70}>
                    <TextField
                      variant="outlined"
                      label="Phone number"
                      margin="normal"
                      fullWidth
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
                        color="secondary">
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
