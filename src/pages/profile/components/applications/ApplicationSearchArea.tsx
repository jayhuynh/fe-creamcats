import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

import Filters from './application-filter/Filters';
import {
  fromOrganizationApplications,
  useAppDispatch,
} from '../../../../store';

const useStyles = makeStyles({
  search: {
    width: 210,
    height: 50,
  },
  button: {
    width: 135,
    height: 55,
    boxShadow: 'none',
  },
  sort: {
    width: 210,
    height: 50,
  },
});

export interface FilterFormInputs {
  keyword: String;
  sortBy: String;
}

export default function ApplicationSearchArea() {
  const classes = useStyles();
  const [filtersIsActivated, setFiltersIsActivated] = useState(false);

  const dispatch = useAppDispatch();

  const { register, watch } = useForm<FilterFormInputs>({
    defaultValues: {
      keyword: '',
      sortBy: '',
    },
  });

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromOrganizationApplications.doChangeFilters(value));
    });
  }, [watch]);

  return (
    <Grid item xs>
      <Grid container direction="column" spacing={4} alignItems="flex-start">
        <Grid item>
          <Grid container direction="row" spacing={4} alignItems="flex-start">
            <Grid item xs>
              <TextField
                id="applicationSearch"
                label="Search"
                type="search"
                variant="filled"
                className={classes.search}
                {...register('keyword')}
              />
            </Grid>
            <Grid item xs>
              <Button
                variant={filtersIsActivated ? 'contained' : 'outlined'}
                color="primary"
                startIcon={<FilterListIcon />}
                onClick={() => {
                  setFiltersIsActivated(!filtersIsActivated);
                }}
                className={classes.button}
              >
                Filters
              </Button>
            </Grid>
            <Grid item xs>
              <FormControl variant="outlined" className={classes.sort}>
                <InputLabel id="sortSelectLabel">Sort&nbsp;by</InputLabel>
                <Select
                  labelId="sortSelectLabel"
                  id="sortSelect"
                  defaultValue={''}
                  label="Sort by"
                  {...register('sortBy')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="AlphabetIncrement">
                    Alphabet&nbsp;(A-Z)
                  </MenuItem>
                  <MenuItem value="AlphabetDecrement">
                    Alphabet&nbsp;(Z-A)
                  </MenuItem>
                  <MenuItem value="dateIncrement">
                    Date&nbsp;applied&nbsp;(Newest)
                  </MenuItem>
                  <MenuItem value="dateDecrement">
                    Date&nbsp;applied&nbsp;(Oldest)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {filtersIsActivated ? <Filters /> : null}
      </Grid>
    </Grid>
  );
}
