import { useParams } from 'react-router-dom';
import { Grid, Button, Typography, Divider } from '@material-ui/core';
import {
  Card,
  CardMedia,
} from '@material-ui/core';

import Carousel from 'react-material-ui-carousel';

import ReleaseTime from '../../utils/release-time';
import PositionCard from '../../utils/position-card';
import ApplicationDialog from './components/ApplicationDialog';

interface ParamsTypes {
  positionId: string;
}

//---------------- Mock data ----------------
const carouselItems = [
  'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
  'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
  'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
];

const brief: object[] = [
  {
    type: 'Location',
    content: 'Bardon QLD',
  },
  {
    type: 'Type of work',
    content:
      'Administration & Office Management, Companionship & Social Support, Seniors & Aged Care',
  },
  {
    type: 'Commitment',
    content: 'Regular - more than 6 months',
  },
  {
    type: 'Training',
    content: 'Volunteer Training',
  },
  {
    type: 'Time required',
    content: 'Office hours preferred',
  },
  {
    type: 'Number of applicants',
    content: '30 people',
  },
  {
    type: 'Others',
    content:
      'Current flu vaccination. COVID-19 vaccination. Police check (SVCS can organise this for you).',
  },
];

const subtitle: any = {
  title: 'Small Title - Subtitle',
  releaseTime: '2021-08-26 23:09:01',
  extraText: 'by Organisation',
};

const posInfoList: any[] = [
  {
    posCover:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Position 1',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
    releaseTime: '1997-07-26 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
  },
  {
    posCover:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Position 2',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 22:35:00',
  },
  {
    posCover:
      'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
    title: 'Position 3',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 20:42:00',
  },
];

const posDetail: any = (
  <div>
    <Typography
      style={{
        fontSize: 48,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.25,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 30,
      }}
    >
      RESIDENT ADMISSIONS VOLUMTEER - BARDON
    </Typography>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      About us
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipiscing elit sodales primis,
      mollis viverra conubia ligula inceptos laoreet libero tortor, nascetur non
      habitasse iaculis tempor nec egestas fames augue, platea porta integer
      nostra curae sed arcu. Nec ut diam vulputate ante scelerisque ridiculus
      lobortis orci mi
    </Typography>
    <Card style={{ marginBottom: 20 }}>
      <CardMedia
        component="img"
        className="organizationShowcase"
        alt="Organization showcase"
        height="300"
        image="https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4"
      />
    </Card>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Event
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi
      dictum cubilia class habitasse commodo, semper potenti nec ac per egestas.
      Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi
      conubia inceptos euismod odio curabitur, tortor eros porta venenatis
      facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque
      tortor conubia iaculis
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque
      dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate
      taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla
      tristique tempus. Quisque eleifend vulputate.
    </Typography>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Position Description
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi
      dictum cubilia class habitasse commodo, semper potenti nec ac per egestas.
      Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi
      conubia inceptos euismod odio curabitur, tortor eros porta venenatis
      facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque
      tortor conubia iaculis
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque
      dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate
      taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla
      tristique tempus. Quisque eleifend vulputate.
    </Typography>
  </div>
);
//---------------- Mock data ----------------

const genBrief = (brief: any) => {
  return brief.map((item: any) => {
    //how to claim the 'item'?
    return (
      <Grid item key={item.type}>
        <Typography
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#202124',
          }}
          gutterBottom
          variant="h5"
          component="h4"
        >
          {item.type}
        </Typography>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#a6adb4',
          }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {item.content}
        </Typography>
      </Grid>
    );
  });
};

const genPositionCards = (posInfoList: object[]) => {
  return posInfoList.map((item: any) => {
    return (
      <Grid item xs>
        <PositionCard
          key={item.title}
          coverURL={item.posCover}
          title={item.title}
          description={item.description}
          releaseTime={item.releaseTime}
        />
      </Grid>
    );
  });
};

function CarouselItem(props: any) {
  return (
    <Card style={{ borderRadius: 0 }}>
      <CardMedia
        component="img"
        className="eventShowcase"
        alt="Event showcase"
        height="600"
        image={props.url}
      />
    </Card>
  );
}

/**
 * Position detail page component
 * @returns Object
 */
const Position = () => {
  const { positionId } = useParams<ParamsTypes>();
  console.log('This is the detail of position ' + { positionId });

  return (
    <div style={{ backgroundColor: '#f6f8f9' }}>
      <Grid
        style={{ width: '100%' }}
        container
        direction="column"
        alignItems="center"
      >
        <Grid item style={{ width: '100%', marginBottom: 30 }}>
          <Carousel>
            {carouselItems.map((item, i) => (
              <CarouselItem key={i} url={item} />
            ))}
          </Carousel>
        </Grid>
        <Grid
          direction="row"
          style={{ width: '75%', marginBottom: 30 }}
          container
          spacing={6}
        >
          <Grid item xs={4}>
            <Grid container direction="column" spacing={3}>
              {genBrief(brief)}
              <Grid item>
                <Divider />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    color: '#202124',
                  }}
                >
                  {subtitle.title}
                </Typography>
                <ReleaseTime
                  time={subtitle.releaseTime}
                  extraText={subtitle.extraText}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs>
            <div>
              {/* HTML embedding will be replaced in the future
              <div dangerouslySetInnerHTML={{ __html: posDetail }} />*/}
              {posDetail}
              <ApplicationDialog/>
            </div>
          </Grid>
        </Grid>
        <Grid style={{ width: '70%', marginBottom: 30 }} container>
          <Typography
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              fontStretch: 'normal',
              fontStyle: 'normal',
              letterSpacing: 'normal',
              textAlign: 'left',
              color: '#202124',
              marginBottom: 20,
            }}
          >
            RELATED POSITIONS
          </Typography>
          <Grid container spacing={4}>
            {genPositionCards(posInfoList)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Position;
