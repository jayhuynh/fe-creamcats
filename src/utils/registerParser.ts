import moment from 'moment';
import { OrganizationApplication } from '../models';

export function parseApplications(data: OrganizationApplication[]) {
  return data.map((row: any) => {
    return {
      ...row,
      name: row.applicantName,
      gender: row.gender.slice(0, 1) + row.gender.slice(1).toLowerCase(),
      event: row.eventName,
      position: row.positionName,
      dateApplied: moment(row.appliedAt).format('DD/MM/YYYY'),
      pendingStatus: row.status,
    };
  });
}

export function parseFilter(filters: any) {
  const { keyword, sortBy, gender, event, position, limit, offset } = filters;

  let parsedFilter = {};

  if (keyword !== '') {
    parsedFilter = { ...parsedFilter, search: keyword };
  }
  if (gender !== '') {
    parsedFilter = { ...parsedFilter, gender: gender.toLowerCase() };
  }
  if (event !== '') {
    parsedFilter = { ...parsedFilter, eventId: event };
  }
  if (position !== '') {
    parsedFilter = { ...parsedFilter, positionId: position };
  }

  let sort, order;

  if (sortBy !== '') {
    if (sortBy === 'AlphabetIncrement') {
      sort = 'applicantName';
      order = 'asc';
    } else if (sortBy === 'AlphabetDecrement') {
      sort = 'applicantName';
      order = 'desc';
    } else if (sortBy === 'dateIncrement') {
      sort = 'appliedAt';
      order = 'asc';
    } else if (sortBy === 'dateDecrement') {
      sort = 'appliedAt';
      order = 'desc';
    }
    parsedFilter = { ...parsedFilter, sort: sort, order: order };
  }

  parsedFilter = { ...parsedFilter, offset: offset, limit: limit };

  return parsedFilter;
}
