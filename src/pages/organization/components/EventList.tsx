import { Box, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import PositionCard from '../../../utils/position-card';
import { VoluntaryEvent } from '../../../models';
import { useState } from 'react';


interface EventListProps {
  events: VoluntaryEvent[];
}

export default function EventList({ events }: EventListProps) {
  console.log(events);
  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const positionCards = events.slice((page - 1) * (pageSize), page * (pageSize)).map((item: VoluntaryEvent) => {
    return (
      <Grid key={item.name} item xs={4}>
        <PositionCard
          title={item.name}
          usage="personal"
          status="ONGOING"
          description={item.desc}
          time={item.startTime}
        />
      </Grid>
    );
  });

  return (
      <>
          <Box minHeight={'840px'}>
              <Grid container direction="column" spacing={4}>
                  {/*<VoluntaryWorksFilter />*/}
                  <Grid item>
                      <Grid container wrap="wrap" spacing={4}>
                          {positionCards}
                      </Grid>
                  </Grid>
              </Grid>
          </Box>
          <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
          >
              <Box marginY={2}>
                  <Pagination count={Math.ceil(events.length / pageSize)}
                              page={page}
                              shape="rounded"
                              color="secondary"
                              onChange={handleChange} />
              </Box>
          </Grid>
      </>
  );
}
