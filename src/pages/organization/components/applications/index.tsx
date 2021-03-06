import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import { fromAuth, useAppDispatch } from '../../../../store';

import ApplicationSearchArea from './ApplicationSearchArea';
import ApplicationTable from './ApplicationTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa6980',
    },
    secondary: {
      main: '#bfc4c9',
    },
  },
});

export default function Applications(props: any) {
  // Where should I get the organization ID?
  const organizationId = useSelector(fromAuth.selectOrganizationId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromAuth.doFetchOrganizationId());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="column" spacing={4} alignItems="flex-start">
        <ApplicationSearchArea organizationId={organizationId} />
        <ApplicationTable organizationId={organizationId} />
      </Grid>
    </MuiThemeProvider>
  );
}
