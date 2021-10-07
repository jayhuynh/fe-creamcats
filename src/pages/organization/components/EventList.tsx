import { Box, Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';

import PositionCard from '../../../utils/position-card';
import { VoluntaryEvent } from '../../../models';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface TitleProps {
  total: number;
  showFilters?: boolean;
}


const Title = ({ total, showFilters }: TitleProps) => {
  const sortOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Date created (Newest)',
      value: 'des',
    },
    {
      label: 'Date created (Newest)',
      value: 'asc',
    },
  ];

  return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box width={'100%'} fontWeight="fontWeightBold" marginBottom={3}>
                <Typography variant="h5">Events ({total})</Typography>
            </Box>
                { showFilters ?
                    <Box marginBottom={4} width={'100%'}>
                        <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={3}>
                            <Grid item>
                                <Select
                                    style={{ minWidth: '150px' }}
                                    defaultValue='all'
                                    variant="outlined"
                                    displayEmpty
                                >
                                    {sortOptions.map(opt => (
                                        <MenuItem value={opt.value} key={opt.value}>{opt.label}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ padding: '15px' }}
                                    variant="outlined"
                                    startIcon={<AddIcon/>}>
                                    Create a new post
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                  : <></> }
        </Grid>
  );
};

interface EventListProps {
  events: VoluntaryEvent[];
  showFilters?: boolean;
}

export default function EventList({ events, showFilters }: EventListProps) {
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
            <Title total={events.length} showFilters={showFilters}/>
            <Box>
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
                                onChange={handleChange}/>
                </Box>
            </Grid>
        </>
  );
}
