import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Card, CardMedia, Grid } from '@material-ui/core';
import OrganizationInformation from './components/OrganizationInformation';
import OrganizationEvent from './components/OrganizationEvent';
import OrganizationApplication from './components/OrganizationApplication';

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
//------------- Mock Data -------------

/**
 * Profile page component
 * @returns Object
 */
const OrganizationPublicPage = () => {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            This is organization public page
        </div>
  );
};

export default OrganizationPublicPage;
