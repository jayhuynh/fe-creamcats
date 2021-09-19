import { Grid, Box } from '@material-ui/core';
import HighlightBanner from './components/HighlightBanner';
import TitleContainer from './components/TitleContainer';
import PositionsList from './components/PositionsList';
import { useQuery } from '../../routes';
import { fromPositions, useAppDispatch } from '../../store';
import moment from 'moment';
import { FilterFormInputs } from './components/filter/Filters';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
  const { queryDictionary } = useQuery();
  const dispatch = useAppDispatch();
  const filter = useSelector(fromPositions.selectFilters);

  useEffect(() => {
    const query = queryDictionary();
    dispatch(fromPositions.doChangeFilters({
      address: query.address ? query.address : filter.address,
      distance: query.within ? Number(query.within) : filter.distance,
      gender: query.gender ? query.gender : filter.gender,
      tags: query.tags ? query.tags : filter.tags,
      startDate: query.dayfrom ? moment(query.dayfrom as string).toDate() : filter.startDate,
      endDate: query.dayto ? moment(query.dayto as string).toDate() : filter.endDate,
      limit: query.limit ? Number(query.limit) : filter.limit,
      offset: query.offset ? Number(query.offset) : filter.offset,
      sort: query.sort ? query.sort : filter.sort,
      order: query.order ? query.order : filter.order,
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
