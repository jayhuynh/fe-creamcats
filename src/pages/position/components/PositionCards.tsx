import { Grid } from '@material-ui/core';

import PositionCard from '../../../utils/position-card';

/**
 * This component generate a Grid container rendering all position cards in the input list
 * @param { Object } positionInfoList An array of all the position cards' information
 */
export default function PositionCards(props: any) {
  const { positionInfoList } = props;

  const positionSlice = positionInfoList.slice(0, 6);

  return positionSlice.map((item: any) => {
    return (
      // `xs={4}` makes sure there will be three grid in each line
      <Grid item xs={4} key={item.name}>
        <PositionCard
          coverURL={item.thumbnail}
          title={item.name}
          description={item.description}
          time={item.createdAt}
        />
      </Grid>
    );
  });
}
