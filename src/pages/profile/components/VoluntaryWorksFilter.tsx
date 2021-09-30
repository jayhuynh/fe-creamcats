import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { fromApplications, useAppDispatch } from '../../../store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa6980',
    },
  },
});

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
  select: {
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    color: '#202124',
  },
}));

interface FilterFormInputs {
  statusFilter: string;
}

export default function VoluntaryWorksFilter() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { register, watch } = useForm<FilterFormInputs>({
    defaultValues: {
      statusFilter: 'ALL',
    },
  });

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromApplications.doFetchMyApplications(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <Grid item xs>
      <ThemeProvider theme={theme}>
        <FormControl className={classes.formControl}>
          <InputLabel id="voluntary-work-filter">Sort by</InputLabel>
          <Select
            labelId="voluntary-work-filter"
            IconComponent={SortIcon}
            className={classes.select}
            {...register('statusFilter')}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
            <MenuItem value="PASSED">Passed</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="ONGOING">On-going</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </Grid>
  );
}
