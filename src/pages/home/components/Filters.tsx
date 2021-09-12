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
import { PropsWithChildren, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { DateType } from '@date-io/type';
import moment from 'moment';
import { CcDatePicker } from '../../../utils';

interface OptionContainerInputs {
  name: string
  label: string
}

const OptionContainer = (props: PropsWithChildren<OptionContainerInputs>) => (
  <FormControl fullWidth>
    <Box mt={2} mb={1}>
      <Grid
        container>
        <Grid container xs={6} justifyContent="flex-start" alignItems="center">
          <Typography variant="subtitle2">{props.label}</Typography>
        </Grid>
        <Grid container xs={6} justifyContent="flex-end" alignItems="center">
          <Typography color="secondary" variant="caption">Clear</Typography>
        </Grid>
      </Grid>
    </Box>
    {props.children}
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

const Filters = () => {
  const [age, setAge] = useState('');
  const [personName, setPersonName] = useState<string[]>([]);
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const [date, setDate] = useState<DateType | null>(moment(new Date()));

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <OptionContainer name="gender" label="Gender">
          <Select
            value={age}
            onChange={handleChange}
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </OptionContainer>
      </Grid>
      <Grid item xs={4}>
        <OptionContainer name="tags" label="Tags">
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
              <TextField {...params} variant="outlined" placeholder="tags" />
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
  );
};

export default Filters;
