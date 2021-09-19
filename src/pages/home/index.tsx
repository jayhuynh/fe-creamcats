import { Grid, Box } from '@material-ui/core';
import HighlightBanner from './components/HighlightBanner';
import TitleContainer from './components/TitleContainer';
import PositionsList from './components/PositionsList';
import { useQuery } from '../../routes';
import { useEffect } from 'react';
import { fromPositions, useAppDispatch } from '../../store';
import moment from 'moment';
import { FilterFormInputs } from './components/filter/Filters';

const Home = () => {
  const { queryDictionary } = useQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = queryDictionary();
    dispatch(fromPositions.doChangeFilters({
      address: query.address ? query.address : '277 Bedford Ave, Brooklyn, NY 11211, USA',
      distance: query.within ? Number(query.within) : 10000,
      gender: query.gender ? query.gender : 'all',
      tags: query.tags ? query.tags : ['Education', 'Young People', 'Community Services'],
      startDate: query.dayfrom ? moment(query.dayfrom as string).toDate() : moment('2021-01-01T14:48:00.000Z').toDate(),
      endDate: query.dayto ? moment(query.dayto as string).toDate() : moment('2022-01-01T14:48:00.000Z').add(7, 'days').toDate(),
      limit: query.limit ? Number(query.limit) : 9,
      offset: query.offset ? Number(query.offset) : 0,
      sort: query.sort ? query.sort : 'applications',
      order: query.order ? query.order : 'desc',
    } as FilterFormInputs));
  }, [queryDictionary, dispatch]);

  return (
    <>
      <HighlightBanner/>
      <Grid
        justifyContent="center"
        container>
        <Box width="85%">
          <TitleContainer/>
          <PositionsList/>
        </Box>
      </Grid>
    </>
  );
};

export default Home;
