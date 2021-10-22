import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import PositionCard from '../../../utils/position-card';

/**
 * Generate position cards for event page
 * Doesn't include the 'Position ({Number of position})' and the 'Add a position' button
 * @param {Position[]} positionInfo A list of standard position information
 */
export default function EventPositions(props: any) {
  const positionCards = props.positionInfo.map((position: any) => {
    const { thumbnail, name, desc, timeCreated, id } = position;
    return (
      <Grid item xs={4} key={name}>
        <Link to={`/positions/${id}`} style={{ textDecoration: 'none' }}>
          <PositionCard
            coverURL={thumbnail}
            title={name}
            description={desc}
            time={timeCreated}
          />
        </Link>
      </Grid>
    );
  });

  return (
    <Grid container direction="row" wrap="wrap" spacing={4}>
      {positionCards}
    </Grid>
  );
}
