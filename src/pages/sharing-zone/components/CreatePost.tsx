import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, TextField, Checkbox, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { CcDropZone, DialogTitle } from '../../../utils';


const useStyles = makeStyles(theme => ({
  root: {
  },
  maxSize: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    height: 0,
  },
  button: {
    border: '2px solid lightgrey',
    borderRadius: 6,
  },
}));

interface CreatePostFormInputs {
  image: string;
  title: string;
  body: string;
}

export const CreatePost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreatePostFormInputs>({
    defaultValues: { image: '', title: '', body: '' },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doCreatePost = async ({ image, title, body }: CreatePostFormInputs) => {
    // const formattedEmail = email.toLowerCase();
    // await dispatch(fromAuth.doCreatePost({ credential: { email: formattedEmail, password }, rememberMe }));
  };

  const handleChangeImage = (event: any) => {

  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Create a new post
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="create-post-dialog" onClose={handleClose}>
          Create a new post
        </DialogTitle>
        <DialogContent className={classes.root}>
          <Grid container>
            <form onSubmit={handleSubmit(doCreatePost)} className={classes.maxSize}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                className={classes.maxSize}
              >
                <Box
                  border={1}
                  borderColor="grey.400"
                  borderRadius={5}
                  width={0.70}>
                  <CcDropZone/>
                </Box>
                <Box width={0.70}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    autoFocus
                    label="Title"
                    {...register('title')}
                    error={!!errors.title}
                  />
                </Box>
                <Box width={0.70}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={15}
                    margin="normal"
                    label="Content"
                    {...register('body')}
                    error={!!errors.body}
                  />
                </Box>
                <Box mt={2} width={0.70} marginBottom={2}>
                  <Grid
                    container>
                    <Grid container xs={6} justifyContent="flex-start" alignItems="center">
                    </Grid>
                    <Grid container xs={6} justifyContent="flex-end" alignItems="center">
                      <Button
                        variant="contained"
                        type="submit"
                        color="secondary">
                        Post
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
