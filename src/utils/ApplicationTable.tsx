import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles({
  table: {
    width: 930,
  },
  tableHeadText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    color: '#aaa',
  },
  tableBodyFirstColumnText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    color: '#333',
  },
  tableBodyText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    color: '#333',
  },
});

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
//------------- Mock Data -------------
const mockData = [
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'ACCEPTED',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'REJECTED',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
  {
    name: 'Alisa Thompson',
    gender: 'FEMALE',
    event: 'Event Name',
    position: 'Volunteer Marketer',
    dateApplied: '2021-09-21',
    pendingStatus: 'PENDING',
  },
];
//------------- Mock Data -------------

function parseData(data: any) {
  return data.map((row: any) => {
    return {
      name: row.name,
      gender: row.gender.slice(0, 1) + row.gender.slice(1).toLowerCase(),
      event: row.event,
      position: row.position,
      dateApplied: moment(row.dateApplied).format('DD/MM/YYYY'),
      pendingStatus: row.pendingStatus,
    };
  });
}

export default function BasicTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>
                Applicant&nbsp;Name
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>Gender</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>Event</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>
                Position
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>
                Date&nbsp;applied
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography className={classes.tableHeadText}>Pending</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parseData(mockData).map((row: any) => (
            <TableRow key={row.name}>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableBodyFirstColumnText}
              >
                {row.name}
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.tableBodyText}>
                  {row.gender}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.tableBodyText}>
                  {row.event}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.tableBodyText}>
                  {row.position}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.tableBodyText}>
                  {row.dateApplied}
                </Typography>
              </TableCell>
              <TableCell>
                <MuiThemeProvider theme={theme}>
                  <IconButton
                    color={
                      row.pendingStatus === 'ACCEPTED' ? 'primary' : 'secondary'
                    }
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    color={
                      row.pendingStatus === 'REJECTED' ? 'primary' : 'secondary'
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </MuiThemeProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
