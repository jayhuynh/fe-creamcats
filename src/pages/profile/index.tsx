import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardMedia } from '@material-ui/core';

import { fromProfile, useAppDispatch } from '../../store';

import {
  PersonalInformation,
  TabWrapper,
  // Will need these two after refining <TabWrapper />
  // VoluntaryWorks,
  // MyPosts,
} from './components';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f6f8f9',
    paddingBottom: 73,
  },
  banner: {
    width: '100%',
    height: 249,
    borderRadius: 0,
    marginBottom: 65,
    boxShadow: 'none',
  },
  profileContent: {
    width: '95%',
  },
}));

//------------- Mock Data -------------
const imagesURL = {
  questionMark:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png',
  banner:
    'https://www.lachmanconsultants.com/wp-content/uploads/2020/04/iStock-1152125129.jpg',
  avatar:
    'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?size=626&ext=jpg&ga=GA1.2.2013229505.1629417600',
};

const positionInfoList: any[] = [
  {
    posCover:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Position 1',
    status: 'Applied',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
    releaseTime: '2021-09-11 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
  },
  {
    posCover:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Position 2',
    status: 'On-going',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 22:35:00',
  },
  {
    posCover:
      'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
    title: 'Position 3',
    status: 'Ended',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 20:42:00',
  },
  {
    posCover:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Position 4',
    status: 'Applied',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
    releaseTime: '2021-09-10 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
  },
  {
    posCover:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Position 5',
    status: 'On-going',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 22:35:00',
  },
  {
    posCover:
      'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
    title: 'Position 6',
    status: 'Ended',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 20:42:00',
  },
  {
    posCover:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Position 7',
    status: 'Applied',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
    releaseTime: '2021-09-11 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
  },
  {
    posCover:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Position 8',
    status: 'On-going',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
    releaseTime: '2021-08-26 22:35:00',
  },
];

const postInfoList: any[] = [
  {
    postCover:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Resident Admissions Volunteer',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
  {
    postCover:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Helping orphan children',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
  {
    postCover:
      'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
    title: 'We are a family',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
];
//------------- Mock Data -------------

/**
 * Profile page component
 * @returns Object
 */
const Profile = () => {
  const classes = useStyles();
  const profile = useSelector(fromProfile.selectProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromProfile.doFetchProfile());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card className={classes.banner}>
          <CardMedia
            component="img"
            className="profileBanner"
            alt="Profile banner"
            height="249"
            image={imagesURL.banner}
          />
        </Card>
        <Grid
          container
          className={classes.profileContent}
          direction="row"
          justifyContent="flex-start"
          spacing={4}
        >
          <PersonalInformation personalInformations={profile} />
          <Grid item className="HistoryWorksAndPosts" xs>
            <TabWrapper works={positionInfoList} posts={postInfoList} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
