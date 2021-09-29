import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  filterTitle: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterApacing: 'normal',
    textAlign: 'left',
    color: '#202124',
  },
  sort: {
    width: 280,
    height: 50,
  },
});

export default function Filters() {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid container direction="row" spacing={4}>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.sort}>
            <InputLabel id="genderSelectLabel">Gender</InputLabel>
            <Select
              labelId="genderSelectLabel"
              id="genderSelect"
              defaultValue={''}
              label="Gender"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.sort}>
            <InputLabel id="eventSelectLabel">Event</InputLabel>
            <Select
              labelId="eventSelectLabel"
              id="eventSelect"
              defaultValue={''}
              label="event"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="AlphabetIncrement">Alphabet&nbsp;(A-Z)</MenuItem>
              <MenuItem value="AlphabetDecrement">Alphabet&nbsp;(Z-A)</MenuItem>
              <MenuItem value="dateIncrement">
                Date&nbsp;applied&nbsp;(Newest)
              </MenuItem>
              <MenuItem value="dateDecrement">
                Date&nbsp;applied&nbsp;(Oldest)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.sort}>
            <InputLabel id="positionSelectLabel">Position</InputLabel>
            <Select
              labelId="positionSelectLabel"
              id="positionSelect"
              defaultValue={''}
              label="Position"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="AlphabetIncrement">Alphabet&nbsp;(A-Z)</MenuItem>
              <MenuItem value="AlphabetDecrement">Alphabet&nbsp;(Z-A)</MenuItem>
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
  );
}
