import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import PositionCard from '../../../utils/position-card';
import { VoluntaryWorksFilter } from './index';
import moment from 'moment';

export default function VoluntaryWorks(props: any) {
  const { works } = props;
  const sortedApplications = [...works].sort((work1: any, work2: any) => {
    return moment(work2.timeCreated).unix() - moment(work1.timeCreated).unix();
  });

  const positionCards = sortedApplications
    .map((item: any) => {
      return (
        <Grid key={item.title} item xs={4}>
          <Link to={`/positions/${item.position.id}`} style={{ textDecoration: 'none' }}>
            <PositionCard
              coverURL={item.position.thumbnail}
              title={item.position.name}
              usage="personal"
              status={item.status}
              description={item.description}
              time={item.timeCreated}
            />
          </Link>
        </Grid>
      );
    });

  return (
    <Grid container direction="column" spacing={4}>
      <VoluntaryWorksFilter/>
      <Grid item>
        <Grid container wrap="wrap" spacing={4}>
          {positionCards}
        </Grid>
      </Grid>
    </Grid>
  );
}
