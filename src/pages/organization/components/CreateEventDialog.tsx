
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CcDropZone from '../../../utils/CcDropZone';
import Editor from '../../../utils/Editor';
import {
  fromEvents,
  fromNotifications,
  fromOrganizationPositions,
  fromPosts,
  fromVoluntaryEvents,
  useAppDispatch,
} from '../../../store';
import { NotificationsType } from '../../../store/notificationsSlice';
import { Tag } from '../../../models';
import TagsMultiSelect from '../../home/components/filter/components/TagsMultiSelect';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { CcDatePicker } from '../../../utils';

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

export interface CreateEventFormInputs {
  gallery: string[];
  name: string;
  location: string;
  desc: string;
  startTime: Date;
  endTime: Date;
  organizationId: number;
}

interface CreateEventDialogProps {
  organizationId: number;
}

const CreateEventDialog = ({ organizationId }: CreateEventDialogProps) => {
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
  } = useForm<CreateEventFormInputs>({
    defaultValues: {
      gallery: [],
      name: '',
      location: '',
      desc: '',
      startTime: new Date(),
      endTime: new Date(),
      organizationId: 0,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doCreateEvent = async (data: CreateEventFormInputs) => {
    dispatch(fromVoluntaryEvents.createVoluntaryEvent({ event: data }));
    reset();
    setOpen(false);
    dispatch(fromNotifications.doPushNotification({
      message: 'Successfully created a new event',
      key: new Date().getTime(),
      type: NotificationsType.SUCCESS,
    }));
  };

  return (
    <div>
      <Button
        style={{ paddingTop: 7, paddingBottom: 7 }}
        variant={'outlined'}
        onClick={handleClickOpen}
        startIcon={<AddIcon />}>
        Create event
      </Button>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.root}>
          <Grid container>

            <form onSubmit={handleSubmit(doCreateEvent)} className={classes.maxSize}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                className={classes.maxSize}
              >
                <Box width={1}>
                  <Typography className={classes.title}>Create event</Typography>
                </Box>
                <Box borderRadius={5} width={1}>
                  <CcDropZone onChange={(files: string[]) => {
                    setValue('gallery', [...files]);
                  }} maxFiles={10}/>
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Title</Typography>
                  <TextField {...register('name')} fullWidth variant="outlined" placeholder="type something" />
                </Box>
                <Box width={1}>
                  <Typography className={classes.title2}>Address</Typography>
                  <TextField {...register('location')} fullWidth variant="outlined" placeholder="type something" />
                </Box>
                <Box width={1}>
                  <Grid
                    container>
                    <Box paddingRight={5}>
                      <Typography className={classes.title2}>Start time</Typography>
                      <CcDatePicker
                        value={watch('startTime')}
                        onChange={(date: MaterialUiPickersDate) => setValue('startTime', date?.toDate() || new Date())}
                        animateYearScrolling
                      />
                    </Box>
                    <Box width={0.5}>
                      <Typography className={classes.title2}>End time</Typography>
                      <CcDatePicker
                        value={watch('endTime')}
                        onChange={(date: MaterialUiPickersDate) => setValue('endTime', date?.toDate() || new Date())}
                        animateYearScrolling
                      />
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

export default CreateEventDialog;
