import { Grid, Button, Container } from '@material-ui/core';
import HighlightBanner from './components/HighlightBanner';
import TitleContainer from './components/TitleContainer';
import PositionsList from './components/PositionsList';

const Home = () => {
  return (
    <>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        container>
        <HighlightBanner/>
        <Container fixed>
          <TitleContainer/>
          <PositionsList/>
        </Container>
      </Grid>

    </>
  );
};

export default Home;
