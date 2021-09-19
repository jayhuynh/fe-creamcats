import { Grid } from '@material-ui/core';
import PositionCard from '../../../utils/position-card';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fromPositions, useAppDispatch } from '../../../store';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useDidMountEffect from '../../../utils/useDidMountEffect';

const PositionsList = () => {
  const [viewAll, setViewAll] = useState(false);
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();
  const filters = useSelector(fromPositions.selectFilters);
  const [debouncedFilters] = useDebounce(filters, 300);

  useDidMountEffect(() => {
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch, debouncedFilters]);

  return (
    <>
      <Grid container spacing={3}>
        {positions.slice(0, 9).map((position, index) => (
            <Grid item xs={4} key={position.id}>
              <Link to={`/positions/${position.id}`} style={{ textDecoration: 'none' }}>
                <PositionCard
                  coverURL={position.thumbnail}
                  title={position.name}
                  description={position.description}
                  releaseTime={position.createdAt}
                />
              </Link>
            </Grid>
        ))}
      </Grid>
      <Grid
        justifyContent="center"
        container>
        <Box m={4}>
          <Button variant="contained"
                  onClick={() => { dispatch(fromPositions.doLoadMore()); }}
                  color="secondary">LOAD MORE</Button>
        </Box>
      </Grid>
    </>
  );
};

export default PositionsList;
