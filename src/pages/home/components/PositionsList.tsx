import { Grid } from '@material-ui/core';
import PositionCard from '../../../utils/position-card';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fromPositions, useAppDispatch } from '../../../store';

const PositionsList = () => {
  const [viewAll, setViewAll] = useState(false);
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {positions.slice(0, viewAll ? 9 : 3).map((position, index) => (
        <Grid item xs={4} key={position.id}>
          <PositionCard
            coverURL={position.thumbnail}
            title={position.name}
            description={position.description}
            releaseTime={position.createdAt}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PositionsList;
