import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Event, Position } from '../../../../../models';

import {
  fromEvents,
  fromOrganizationPositions,
  fromOrganizationApplications,
  useAppDispatch,
} from '../../../../../store';

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

export interface SubFilterFormInputs {
  gender: String;
  event: Number;
  position: Number;
}

function generateEventOptions(events: Event[]) {
  return events.map((event: Event) => {
    return (
      <MenuItem key={event.id} value={event.id}>
        {event.name}
      </MenuItem>
    );
  });
}

function generatePositionOptions(positions: Position[]) {
  return positions.map((position: Position) => (
    <MenuItem key={position.id} value={position.id}>
      {position.name}
    </MenuItem>
  ));
}

export default function Filters() {
  const classes = useStyles();

  const organizationId = 4;

  const events = useSelector(fromEvents.selectEvents);
  const positions = useSelector(
    fromOrganizationPositions.selectOrganizationPositions,
  );
  const dispatch = useAppDispatch();

  const { register, watch } = useForm<SubFilterFormInputs>({
    defaultValues: {
      gender: '',
      event: -1,
      position: -1,
    },
  });

  useEffect(() => {
    const subscription = watch(value => {
      dispatch(fromOrganizationApplications.doChangeSubFilters(value));
    });
    dispatch(
      fromOrganizationPositions.doFetchOrganizationPositions({
        organizationId: Number(organizationId),
      }),
    );
    dispatch(
      fromEvents.doFetchEvents({ organizationId: Number(organizationId) }),
    );
  }, [watch, dispatch, organizationId]);

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
              {...register('gender')}
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
              defaultValue={-1}
              label="event"
              {...register('event')}
            >
              <MenuItem value={-1}>
                <em>None</em>
              </MenuItem>
              {generateEventOptions(events)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" className={classes.sort}>
            <InputLabel id="positionSelectLabel">Position</InputLabel>
            <Select
              labelId="positionSelectLabel"
              id="positionSelect"
              defaultValue={-1}
              label="Position"
              {...register('position')}
            >
              <MenuItem value={-1}>
                <em>None</em>
              </MenuItem>
              {generatePositionOptions(positions)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
