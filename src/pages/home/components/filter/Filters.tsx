import {
  Grid,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useEffect } from 'react';
import { MyLocation } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import InputAdornment from '@material-ui/core/InputAdornment';

import { CcDatePicker } from '../../../../utils';
import { fromPositions, useAppDispatch } from '../../../../store';
import { home as homeRoute, useNavigate } from '../../../../routes';
import { Tag } from '../../../../models';
import TagsMultiSelect from './components/TagsMultiSelect';
import OptionContainer from './components/OptionContainer';
import useDidMountEffect from '../../../../utils/useDidMountEffect';

export interface FilterFormInputs {
  address: string;
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
  let query: any = {
    gender: filters.gender,
    tags: filters.tags,
    address: filters.address,
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

  // Remove temporary because backend bug
  delete query.sort;
  delete query.order;

  return query;
};

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
      value.offset = 0;
      dispatch(fromPositions.doClear());
      dispatch(fromPositions.doChangeFilters(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  useDidMountEffect(() => {
    replace(homeRoute.path, replaceQuery(parseQuery(filters)));
  }, [filters, replaceQuery, replace]);

  const handleChangeTags = (value: Tag[]) => {
    setValue('tags', [...value] );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <OptionContainer label="Starting Location">
          <TextField
            variant="outlined"
            required
            {...register('address')}
            error={!!errors.address}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MyLocation
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(position => {
                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDjtgoai7vPIEm7ARnTalIn-f3YX_T-e-w&language=en-AU`)
                          .then(response => response.json())
                          .then(data => setValue('address', data.results[0].formatted_address));
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
          <TagsMultiSelect onTagsChange={handleChangeTags} selectedTags={watch('tags') || []}/>
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
