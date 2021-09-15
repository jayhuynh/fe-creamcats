import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles({
  carouselItem: {
    borderRadius: 0,
    boxShadow: 'none',
  },
});

const defaultImageURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png';

/**
 * This component return a Card component as an item shown in the carousel
 * @param {String} url The URL of the picture
 */
function CarouselItem(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.carouselItem}>
      <CardMedia
        component="img"
        className="eventShowcase"
        alt="Event showcase"
        height="600"
        image={typeof props.url === 'undefined' ? defaultImageURL : props.url}
      />
    </Card>
  );
}

/**
 * This component provides a carousel component which shows multiple pictures
 * @param {String[]} carouselItems An array contains the URL of pictures  shown in the carousel
 */
export default function PositionCarousel(props: any) {
  const { carouselItems } = props;

  if (typeof carouselItems === 'undefined' || carouselItems.length <= 0) {
    return (
      <Carousel>
        <CarouselItem url={undefined} />
      </Carousel>
    );
  } else {
    return (
      <Carousel>
        {carouselItems.map((item: string, i: number) => (
          <CarouselItem key={i} url={item} />
        ))}
      </Carousel>
    );
  }
}
