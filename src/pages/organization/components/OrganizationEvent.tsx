import React, { useEffect, useState } from 'react';
import { Typography, Box, Tab, Tabs, AppBar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import EventList from './EventList';
import { VoluntaryEvent } from '../../../models';
import { useSelector } from 'react-redux';
import { fromProfile, fromVoluntaryEvents, useAppDispatch } from '../../../store';
import { VoluntaryEventService } from '../../../services';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#f6f8f9',
    paddingBottom: 73,
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#f6f8f9',
    color: '#333',
    boxShadow: 'none',
  },
  tab: {
    fontFamily: 'HelveticaNeue',
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2.5,
    letterSpacing: 'normal',
    textTransform: 'none',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ backgroundColor: '#f6f8f9', paddingTop: 10 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrganizationEvent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const events = useSelector(fromVoluntaryEvents.selectAllVoluntaryEvents);
  const profile: any = useSelector(fromProfile.selectProfile) || {};
  const dispatch = useAppDispatch();
  const [pastEvents, setPastEvents] = useState<VoluntaryEvent[]>([]);

  useEffect(() => {
    dispatch(fromVoluntaryEvents.getVoluntaryEvents({ organizationId: profile.id }));
    (async () => {
      const { data } = await VoluntaryEventService.getOrganizationVoluntaryEvents(profile.id, 'past');
      setPastEvents(data);
    })();
  }, [dispatch, profile, setPastEvents]);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className={classes.tab}
            label="On-going events"
            {...a11yProps(0)}
          />
          <Tab className={classes.tab} label="Pass events" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EventList events={events} showFilters={true} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EventList events={pastEvents} />
      </TabPanel>
    </div>
  );
}
