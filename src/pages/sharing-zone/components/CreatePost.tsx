import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, TextField, Checkbox, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CcDropZone from '../../../utils/CcDropZone';
import Editor from '../../../utils/Editor';
import { fromNotifications, fromPosts, useAppDispatch } from '../../../store';
import { NotificationsType } from '../../../store/notificationsSlice';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      display: 'block',
    },
    '& .MuiFilledInput-root':{
      width: '100%',
      borderRadius: 4,
      background: '#f6f8f9',
    },
    '& .MuiFilledInput-input':{
      padding: '12px',
    },
    '& .MuiFilledInput-multiline':{
      padding: 0,
    },
    '& .MuiFilledInput-underline:before':{
      display: 'none',
    },
    '& .MuiButton-containedSecondary':{
      boxShadow: 'none',
      background: '#fa6980',
    },
    '& .MuiButton-root':{
      padding: '6px 30px',
    },
    '& .ck-content':{
      minHeight: 240,
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom:40,
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    margin:'26px 0 15px',
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

export interface CreatePostFormInputs {
  image: string;
  title: string;
  body: string;
}

export const CreatePost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatePostFormInputs>({
    defaultValues: { image: '', title: '', body: '' },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doCreatePost = async (data: CreatePostFormInputs) => {
    await dispatch(fromPosts.doCreatePost({ post: data }));
    setOpen(false);
    dispatch(fromNotifications.doPushNotification({
      message: 'Successfully created a new post',
      key: new Date().getTime(),
      type: NotificationsType.SUCCESS,
    }));
  };

  const handleChangeImage = (event: any) => {};

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon />}>
        Create a new post
      </Button>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle  id="create-post-dialog" onClose={handleClose}>&nbsp;</DialogTitle> */}
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
                 <Box width={1}>
              <Typography className={classes.title}> Create a new post</Typography>
            </Box>
                <Box borderRadius={5} width={1}>
                  <CcDropZone onChange={(files: string[]) => {
                    setValue('image', files[0]);
                  }} maxFiles={10}/>
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Title of your post</Typography>
                  <TextField {...register('title')} variant="filled" placeholder="type something" />
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Content</Typography>
                  <Editor onChange={(data: string) => {setValue('body', data);}}/>
                </Box>
                <Box mt={2} width={1} marginBottom={2}>
                  <Grid container>
                    <Grid container xs={6} justifyContent="flex-start" alignItems="center"></Grid>
                    <Grid container xs={6} justifyContent="flex-end" alignItems="center">
                      <Button variant="contained" type="submit" color="secondary">
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
