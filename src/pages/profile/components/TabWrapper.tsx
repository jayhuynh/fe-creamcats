import React from 'react';
import { Typography, Box, Tab, Tabs, AppBar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { VoluntaryWorks, MyPosts } from './index';

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

/**
 * Refine this component later
 */
export default function TabWrapper(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { works, posts } = props;

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
            label="Voluntary work"
            {...a11yProps(0)}
          />
          <Tab className={classes.tab} label="My Posts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VoluntaryWorks works={works} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyPosts posts={posts} />
      </TabPanel>
    </div>
  );
}
