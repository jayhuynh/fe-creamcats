import { Grid } from '@material-ui/core';
import PositionCard from '../../../utils/position-card';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fromPositions, useAppDispatch } from '../../../store';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

const PositionsList = () => {
  const [viewAll, setViewAll] = useState(false);
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        {positions.slice(0, viewAll ? 9 : 3).map((position, index) => (
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
                  type="submit"
                  color="secondary">LOAD MORE</Button>
        </Box>
      </Grid>
    </>
  );
};

export default PositionsList;
