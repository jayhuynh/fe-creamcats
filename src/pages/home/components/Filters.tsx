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
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckBox, CheckBoxOutlineBlank, MyLocation } from '@material-ui/icons';
import { CcDatePicker } from '../../../utils';
import { useSelector } from 'react-redux';
import { fromPositions, fromTags, useAppDispatch } from '../../../store';
import { useForm } from 'react-hook-form';
import { home as homeRoute, useNavigate } from '../../../routes';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import InputAdornment from '@material-ui/core/InputAdornment';

export interface FilterFormInputs {
  startingLocation: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
  distance: number;
  gender?: string;
  tags?: string[];
  startDate: Date;
  endDate: Date;
  limit: number;
  offset: number;
  sort: string;
  order: string;
}

export const parseQuery = (filters: FilterFormInputs) => {
  let query = {
    gender: filters.gender,
    tags: filters.tags,
    lng: filters.startingLocation.longitude,
    lat: filters.startingLocation.latitude,
    within: filters.distance,
    dayfrom: filters.startDate.toISOString(),
    dayto: filters.endDate.toISOString(),
    limit: filters.limit,
    offset: filters.offset,
    sort: filters.sort,
    order: filters.order,
  };
  if (filters.gender === 'all') delete query.gender;
  if (!filters.tags || filters.tags?.length === 0) delete query.tags;
  if (!filters.tags || filters.tags?.length === 0) delete query.tags;
  return query;
};

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
  const { replace, replaceQuery } = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useSelector(fromPositions.selectFilters);
  const { register, watch, formState: { errors }, setValue } = useForm<FilterFormInputs>({
    defaultValues: {
      ...filters,
      offset: 0,
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      dispatch(fromPositions.doChangeFilters(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  useEffect(() => {
    replace(homeRoute.path, replaceQuery(parseQuery(filters)));
  }, [filters, replaceQuery, replace]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <OptionContainer label="Starting Location">
          <TextField
            variant="outlined"
            required
            value={'My address'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MyLocation
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(position => {
                        setValue('startingLocation', {
                          longitude: position.coords.longitude,
                          latitude: position.coords.latitude,
                        });
                      });
                    }}
                  />
                </InputAdornment>
              ),
            }}
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
