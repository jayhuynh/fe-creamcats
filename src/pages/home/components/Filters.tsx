import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { PropsWithChildren, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import moment from 'moment';
import { CcDatePicker } from '../../../utils';
import { useSelector } from 'react-redux';
import { fromPositions, fromTags, useAppDispatch } from '../../../store';
import { Tag } from '../../../models';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { home as homeRoute, useNavigate } from '../../../routes';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface FilterFormInputs {
  startingLocation: string
  distance: number
  gender: string
  tags: Tag[]
  startDate: Date;
  endDate: Date;
  limit: number;
}

interface OptionContainerInputs {
  label: string
  quickClear?: boolean
}

const OptionContainer = ({
  label,
  quickClear = false,
  ...rest
}: PropsWithChildren<OptionContainerInputs>) => (
  <FormControl fullWidth>
    <Box mt={2} mb={1}>
      <Grid
        container>
        <Grid container xs={6} justifyContent="flex-start" alignItems="center">
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
        { quickClear ?
          <Grid container xs={6} justifyContent="flex-end" alignItems="center">
            <Typography color="secondary" variant="caption">Clear</Typography>
          </Grid> : null
        }
      </Grid>
    </Box>
    {rest.children}
  </FormControl>
);

const genders = [
  { label: 'All', value: 'all' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const distances = [
  { label: '5km', value: 5000 },
  { label: '10km', value: 10000 },
  { label: '20km', value: 20000 },
];

const TagsFilter = () => {
  const tags = useSelector(fromTags.selectTags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromTags.doFetchTags());
  }, [dispatch]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={tags}
      disableCloseOnSelect
      fullWidth
      getOptionLabel={option => option.name}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small"/>}
            checkedIcon={<CheckBox fontSize="small"/>}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" placeholder="tags"/>
      )}
    />
  );
};

const Filters = () => {
  const { replace, replaceQuery, convertSearchString } = useNavigate();
  const dispatch = useAppDispatch();
  const initialState: FilterFormInputs = {
    startingLocation: 'My address',
    distance: distances[0].value,
    gender: genders[1].value,
    tags: [],
    startDate: moment().toDate(),
    endDate: moment().add(7, 'days').toDate(),
    limit: 9,
  };
  const { register, watch, formState: { errors }, setValue } = useForm<FilterFormInputs>({
    defaultValues: initialState,
  });
  const [queryString, setQueryString] = useState('');
  const [debouncedQueryString] = useDebounce(queryString, 300);

  useEffect(() => {
    if (debouncedQueryString) dispatch(fromPositions.doFetchPositions({ queryString: debouncedQueryString }));
  }, [dispatch, debouncedQueryString]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const query = replaceQuery({
        gender: value.gender,
        // tags: value.tags?.join(','),
        address: value.startingLocation,
        within: value.distance,
        dayfrom: value.startDate.toISOString(),
        dayto: value.endDate.toISOString(),
        limit: value.limit,
      });
      replace(homeRoute.path, query);
      setQueryString(convertSearchString(query));
    });
    return () => subscription.unsubscribe();
  }, [watch, replaceQuery, replace, convertSearchString]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <OptionContainer label="Starting Location">
          <TextField
            variant="outlined"
            required
            {...register('startingLocation')}
            error={!!errors.startingLocation}
          />
        </OptionContainer>
      </Grid>
      <Grid item xs={4}>
        <OptionContainer label="Participant Gender">
          <Select
            {...register('gender')}
            value={watch('gender')}
            error={!!errors.gender}
            variant="outlined"
            displayEmpty
          >
            {genders.map(gender => (<MenuItem value={gender.value} key={gender.value}>{gender.label}</MenuItem>))}
          </Select>
        </OptionContainer>
      </Grid>
      <Grid item xs={4}>
        <OptionContainer label="Start Date">
          <CcDatePicker
            value={watch('startDate')}
            onChange={(date: MaterialUiPickersDate) => setValue('startDate', date?.toDate() || new Date())}
            animateYearScrolling
          />
        </OptionContainer>
      </Grid>

      <Grid item xs={4}>
        <OptionContainer label="Distance">
          <Select
            {...register('distance')}
            value={watch('distance')}
            variant="outlined"
            displayEmpty
          >
            {distances.map(distance =>
              (<MenuItem value={distance.value} key={distance.value}>{distance.label}</MenuItem>))
            }
          </Select>
        </OptionContainer>
      </Grid>
      <Grid item xs={4}>
        <OptionContainer label="Tags" quickClear>
          <TagsFilter/>
        </OptionContainer>
      </Grid>
      <Grid item xs={4}>
        <OptionContainer label="End Date">
          <CcDatePicker
            {...register('endDate')}
            value={watch('endDate')}
            onChange={(date: MaterialUiPickersDate) => setValue('endDate', date?.toDate() || new Date())}
            animateYearScrolling
          />
        </OptionContainer>
      </Grid>
    </Grid>
  );
};

export default Filters;
