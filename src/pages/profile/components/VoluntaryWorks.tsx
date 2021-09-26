import { Grid } from '@material-ui/core';

import PositionCard from '../../../utils/position-card';
import { VoluntaryWorksFilter } from './index';

export default function VoluntaryWorks(props: any) {
  const { works } = props;

  const positionCards = works.map((item: any) => {
    return (
      <Grid key={item.title} item xs={4}>
        <PositionCard
          coverURL={item.thumbnail}
          title={item.title}
          usage="personal"
          status={item.status}
          description={item.description}
          time={item.releaseTime}
        />
      </Grid>
    );
  });

  return (
    <Grid container direction="column" spacing={4}>
      <VoluntaryWorksFilter />
      <Grid item>
        <Grid container wrap="wrap" spacing={4}>
          {positionCards}
        </Grid>
      </Grid>
    </Grid>
  );
}
