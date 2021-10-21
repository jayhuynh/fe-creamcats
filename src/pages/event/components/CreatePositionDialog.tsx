import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, TextField, Checkbox, Typography, MenuItem, Select } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CcDropZone from '../../../utils/CcDropZone';
import Editor from '../../../utils/Editor';
import { fromNotifications, fromOrganizationPositions, fromPosts, useAppDispatch } from '../../../store';
import { NotificationsType } from '../../../store/notificationsSlice';
import { Tag } from '../../../models';
import TagsMultiSelect from '../../home/components/filter/components/TagsMultiSelect';
import { deCreateEventPosition } from '../../../store/organizationPositionsSlice';

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

const genders = [
  { label: 'All', value: 'other' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export interface CreatePositionFormInputs {
  name: string;
  requirements: string;
  desc: string;
  gender: 'male' | 'female' | 'other';
  thumbnail: string;
  eventId: number;
  tags: string[];
}

interface CreatePositionionDialogProps {
  eventId: number;
}

const CreatePositionionDialog = ({ eventId }: CreatePositionionDialogProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreatePositionFormInputs>({
    defaultValues: {
      name: '',
      requirements: '',
      desc: '',
      gender: 'other',
      thumbnail: 'other',
      eventId: eventId,
      tags: [],
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTags = (value: Tag[]) => {
    setValue('tags', [...value] );
  };

  const doCreatePosition = async (data: CreatePositionFormInputs) => {
    dispatch(fromOrganizationPositions.deCreateEventPosition({ position: data }));
    reset();
    setOpen(false);
    dispatch(fromNotifications.doPushNotification({
      message: 'Successfully created a new position',
      key: new Date().getTime(),
      type: NotificationsType.SUCCESS,
    }));
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen} startIcon={<AddIcon />}>
        Create position
      </Button>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.root}>
          <Grid container>

            <form onSubmit={handleSubmit(doCreatePosition)} className={classes.maxSize}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                className={classes.maxSize}
              >
                <Box width={1}>
                  <Typography className={classes.title}>Create position</Typography>
                </Box>
                <Box borderRadius={5} width={1}>
                  <CcDropZone onChange={(files: string[]) => {
                    setValue('thumbnail', files[0]);
                  }} maxFiles={10}/>
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Title</Typography>
                  <TextField {...register('name')} fullWidth variant="outlined" placeholder="type something" />
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Requirements</Typography>
                  <TextField {...register('requirements')} fullWidth variant="outlined" placeholder="type something" />
                </Box>
                <Box width={1}>
                  <Grid
                    container>
                    <Box width={0.75} marginRight={5}>
                      <Typography className={classes.title2}>Requirements</Typography>
                      <TagsMultiSelect
                        onTagsChange={handleChangeTags}
                        limitTags={3}
                        selectedTags={watch('tags') || []}/>
                    </Box>
                    <Box width={0.2}>
                      <Typography className={classes.title2}>Content</Typography>
                      <Select
                        {...register('gender')}
                        value={watch('gender')}
                        error={!!errors.gender}
                        variant="outlined"
                        fullWidth
                        displayEmpty
                      >
                        {genders.map(gender => (<MenuItem value={gender.value} key={gender.value}>{gender.label}</MenuItem>))}
                      </Select>
                    </Box>
                  </Grid>

                </Box>

                <Box width={1}>
                  <Typography className={classes.title2}>Content</Typography>
                  <Editor onChange={(data: string) => {setValue('desc', data);}}/>
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

export default CreatePositionionDialog;
