import React, { useState } from 'react';
import { Typography, Box, Tab, Tabs, AppBar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Register from './Register';
import CreateOrganizationProfile from './CreateOrganizationProfile';
import CreateVolunteerProfile from './CreateVolunteerProfile';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '5vh',
  },
  tabRoot: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'transparent',
    color: '#333',
    boxShadow: 'none',
    borderBottom: 'solid 1px #e5e5e5',
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
      style={{  }}
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

/**
 * Refine this component later
 */
export default function RegisterTabWrapper(props: any) {
  const classes = useStyles();
  const [currentTab, setTab] = useState(0);
  const [registerType, setRegisterType] = useState('Volunteer');

  const handleChange = (event: React.ChangeEvent<{}>, tabId: number) => {
    setTab(tabId);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs value={currentTab} onChange={handleChange} style={{ width: '60vw', margin:'0 auto' }}>
          <Tab className={classes.tab} label="Register" {...a11yProps(0)} />
          <Tab
            className={classes.tab}
            label="Create your profile"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <Register
          setRegisterType={setRegisterType}
          registerType={registerType}
          setTab={setTab}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {registerType === 'Volunteer' ? (
          <CreateVolunteerProfile setTab={setTab} />
        ) : (
          <CreateOrganizationProfile setTab={setTab} />
        )}
      </TabPanel>
    </div>
  );
}
