import { Grid, Container } from '@material-ui/core';
import HighlightBanner from './components/HighlightBanner';
import TitleContainer from './components/TitleContainer';
import PositionsList from './components/PositionsList';

const Home = () => {
  return (
    <>
      <HighlightBanner/>
      <Container fixed>
        <TitleContainer/>
        <PositionsList/>
      </Container>
    </>
  );
};

export default Home;
