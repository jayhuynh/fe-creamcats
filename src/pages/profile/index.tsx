import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Card, CardMedia, Avatar, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PositionCard from '../../utils/position-card';
import PostCard from '../../utils/post-card';

const useStyles = makeStyles((theme: Theme) => ({
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
  personalInformationsCard: {
    backgroundColor: 'white',
    height: 633,
    paddingTop: 43,
    boxShadow: 'none',
  },
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  personalInformationTitle: {
    width: '100%',
    height: 16,
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#a6adb4',
    marginBottom: 7,
  },
  personalInformationContent: {
    width: '100%',
    height: 28,
    fontFamily: 'HelveticaNeue',
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#333',
  },
  editProfileButton: {
    backgroundColor: '#fa6980',
    color: 'white',
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#f6f8f9',
    color: '#333',
    boxShadow: 'none',
  },
  tab: {
    fontFamily: 'HelveticaNeue',
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2.5,
    letterSpacing: 'normal',
    textTransform: 'none',
  },
  voluntaryWork: {},
  myPosts: {},
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

const personalInformations = [
  {
    type: 'Avatar',
    content: imagesURL.avatar,
  },
  {
    type: 'Name',
    content: 'Bennett Franklin',
  },
  {
    type: 'Gender',
    content: 'Male',
  },
  {
    type: 'Age',
    content: 25,
  },
  {
    type: 'Joined work',
    content: 45,
  },
];

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
    title: 'Position 1',
    status: 'Applied',
    description:
      'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
    releaseTime: '2021-09-10 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
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

function VoluntaryWork(props: any) {
  const classes = useStyles();
  const { positionInformationList } = props;

  const positionCards = positionInformationList.map((item: any) => {
    return (
      <Grid item xs={4}>
        <PositionCard
          key={item.title}
          coverURL={item.posCover}
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
    <Grid container className={classes.voluntaryWork} wrap="wrap" spacing={4}>
      {positionCards}
    </Grid>
  );
}

function MyPosts(props: any) {
  const classes = useStyles();
  const { postInformationList } = props;

  const postCards = postInformationList.map((item: any) => {
    return (
      <Grid item>
        <PostCard
          key={item.title}
          coverURL={item.postCover}
          title={item.title}
          description={item.description}
        />
      </Grid>
    );
  });

  return (
    <Grid container className={classes.myPosts} direction="column" spacing={4}>
      {postCards}
    </Grid>
  );
}

//------------- Material UI Tab example -------------
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ backgroundColor: '#f6f8f9', paddingTop: 10 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className={classes.tab}
            label="Voluntary work"
            {...a11yProps(0)}
          />
          <Tab className={classes.tab} label="My Posts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VoluntaryWork positionInformationList={positionInfoList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyPosts postInformationList={postInfoList} />
      </TabPanel>
    </div>
  );
}
//------------- Material UI Tab example -------------

function PersonalInformation(props: any) {
  const classes = useStyles();
  const personalInfo = props.personalInformations;

  const name = personalInfo.find((item: any) => item.type === 'Name').content;

  const personalInformationComponents = personalInfo.map((item: any) => {
    if (item.type === 'Avatar') {
      //Generate avatar
      return (
        <Grid item key={item.type} xs>
          <Avatar
            className={classes.avatar}
            alt={typeof name === 'undefined' ? 'Unknown' : name}
            src={
              //Default a question mark if no URL for avatar
              typeof item.content === 'undefined'
                ? imagesURL.questionMark
                : item.content
            }
          />
        </Grid>
      );
    } else {
      //Generate other personal informations
      return (
        <Grid item key={item.type} xs>
          <Typography className={classes.personalInformationTitle}>
            {item.type}
          </Typography>
          <Typography className={classes.personalInformationContent}>
            {item.content}
          </Typography>
        </Grid>
      );
    }
  });

  return (
    <Grid item xs={3}>
      <Card className={classes.personalInformationsCard}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          {personalInformationComponents}
          <Grid item xs>
            <Button className={classes.editProfileButton}>EDIT PROFILE</Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
/**
 * Profile page component
 * @returns Object
 */
const Profile = () => {
  const classes = useStyles();

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
          <PersonalInformation personalInformations={personalInformations} />
          <Grid item className="HistoryWorksAndPosts" xs>
            <SimpleTabs />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
