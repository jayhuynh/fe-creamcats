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


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
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
        <OptionContainer name="tow" label="Types of work">
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
              <TextField {...params} variant="outlined" placeholder="Favorites" />
            )}
          />
        </OptionContainer>
      </Grid>
    </Grid>
  );
};

export default Filters;
