import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import {
  MuiThemeProvider,
  createTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import moment from 'moment';

const useStyles = makeStyles({
  table: {
    width: 930,
  },
  tableContainer: {
    boxShadow: 'none',
  },
  tableHead: {
    height: 90,
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
    margin: '40px 0 40px 0',
  },
  tableRow: {
    height: 80,
  },
  tableRowText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    color: '#333',
  },
  pagination: {
    margin: '20px 0 20px 10px',
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

export default function ApplicationTable() {
  const classes = useStyles();
  return (
    <Grid item xs>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">
                <Typography className={classes.tableHeadText}>
                  Applicant&nbsp;Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.tableHeadText}>
                  Gender
                </Typography>
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
                <Typography className={classes.tableHeadText}>
                  Pending
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parseData(mockData).map((row: any) => (
              <TableRow key={row.name} className={classes.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableBodyFirstColumnText}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  <Typography className={classes.tableRowText}>
                    {row.gender}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography className={classes.tableRowText}>
                    {row.event}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography className={classes.tableRowText}>
                    {row.position}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography className={classes.tableRowText}>
                    {row.dateApplied}
                  </Typography>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Pagination
              count={10}
              size="small"
              shape="rounded"
              color="primary"
              className={classes.pagination}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
