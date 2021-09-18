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
import { DateType } from '@date-io/type';
import moment from 'moment';
import { CcDatePicker } from '../../../utils';
import { useSelector } from 'react-redux';
import { fromTags, useAppDispatch } from '../../../store';
import { Tag } from '../../../models';
import { useForm } from 'react-hook-form';

interface FilterFormInputs {
  startingLocation: string
  distance: number
  gender: string
  tags: Tag[]
  startDate: Date;
  endDate: Date;
}

interface OptionContainerInputs {
  name: string
  label: string
  quickClear?: boolean
}

const OptionContainer = ({
  name,
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const genders = [
  { label: 'All', value: 'all' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const distances = [
  { label: '5km', value: 5 },
  { label: '10km', value: 10 },
  { label: '20km', value: 20 },
];

const Filters = () => {
  const [age, setAge] = useState('');
  const [personName, setPersonName] = useState<string[]>([]);
  const icon = <CheckBoxOutlineBlank fontSize="small"/>;
  const checkedIcon = <CheckBox fontSize="small"/>;
  const [date, setDate] = useState<DateType | null>(moment(new Date()));
  const tags = useSelector(fromTags.selectTags);
  const disspatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FilterFormInputs>({
    defaultValues: {
      startingLocation: 'starting location',
      distance: 0,
      gender: '',
      tags: [],
      startDate: moment(new Date()),
      endDate: moment(new Date()),
    },
  });


  useEffect(() => {
    disspatch(fromTags.doFetchTags());
  }, [disspatch]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const doFilter = async ({ startingLocation, distance, gender, tags, startDate, endDate }: FilterFormInputs) => {
    console.log(startDate);
  };

  return (
    <form onSubmit={handleSubmit(doFilter)}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <OptionContainer name="startingLocation" label="Starting Location">
            <TextField
              variant="outlined"
              required
              {...register('startingLocation')}
              error={!!errors.startingLocation}
            />
          </OptionContainer>
        </Grid>
        <Grid item xs={4}>
          <OptionContainer name="gender" label="Participant Gender">
            <Select
              value={age}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
            >
              {genders.map(gender => (<MenuItem value={gender.value} id={gender.value}>{gender.label}</MenuItem>))}
            </Select>
          </OptionContainer>
        </Grid>
        <Grid item xs={4}>
          <OptionContainer name="startDate" label="Start Date">
            <CcDatePicker
              value={date}
              onChange={date => setDate(date)}
              animateYearScrolling
            />
          </OptionContainer>
        </Grid>

        <Grid item xs={4}>
          <OptionContainer name="distance" label="Distance">
            <Select
              value={age}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
            >
              {distances.map(distance => (<MenuItem value={distance.value}>{distance.label}</MenuItem>))}
            </Select>
          </OptionContainer>
        </Grid>
        <Grid item xs={4}>
          <OptionContainer name="tags" label="Tags" quickClear>
            <Autocomplete
              multiple
              limitTags={2}
              options={names}
              disableCloseOnSelect
              fullWidth
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </>
              )}
              renderInput={params => (
                <TextField {...params} variant="outlined" placeholder="tags"/>
              )}
            />
          </OptionContainer>
        </Grid>
        <Grid item xs={4}>
          <OptionContainer name="endDate" label="End Date">
            <CcDatePicker
              value={date}
              onChange={date => setDate(date)}
              animateYearScrolling
            />
          </OptionContainer>
        </Grid>
      </Grid>
    </form>
  );
};

export default Filters;
