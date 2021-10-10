import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDebounce } from 'use-debounce';

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
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import {
  fromOrganizationApplications,
  useAppDispatch,
} from '../../../../store';

import {
  parseFilter,
  parseApplications,
} from '../../../../utils/registerParser';

const useStyles = makeStyles({
  table: {
    width: 1000,
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

export interface PaginationInputs {
  limit: Number;
  offset: Number;
}

export default function ApplicationTable(props: any) {
  const classes = useStyles();

  const organizationId = props.organizationId;

  const organizationApplications = useSelector(
    fromOrganizationApplications.selectOrganizationApplications,
  );
  const filters = useSelector(fromOrganizationApplications.selectFilters);
  const [debouncedFilters] = useDebounce(filters, 300);

  const applicationNumber = useSelector(
    fromOrganizationApplications.selectNumber,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fromOrganizationApplications.doFetchOrganizationApplications({
        organizationId: organizationId,
        filters: { ...parseFilter(debouncedFilters) },
      }),
    );
  }, [dispatch, organizationId, debouncedFilters]);

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
            {parseApplications(organizationApplications).map((row: any) => (
              <TableRow
                key={row.name + row.event + row.position}
                className={classes.tableRow}
              >
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
              count={Math.ceil(applicationNumber / filters.limit)}
              size="small"
              shape="rounded"
              color="primary"
              className={classes.pagination}
              onChange={(event, pageNumber) => {
                dispatch(
                  fromOrganizationApplications.doChangePagination({
                    limit: Number(filters.limit),
                    offset: (pageNumber - 1) * filters.limit,
                  }),
                );
              }}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
