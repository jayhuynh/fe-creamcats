import { Grid, Container, Box } from '@material-ui/core';
import HighlightBanner from './components/HighlightBanner';
import TitleContainer from './components/TitleContainer';
import PositionsList from './components/PositionsList';

const Home = () => {
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
