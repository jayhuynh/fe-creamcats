import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Card,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ProfileService } from '../../../services';
import { Profile } from '../../../models';
import { useSelector } from 'react-redux';
import { fromApplications } from '../../../store';

const questionMark =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png';

const useStyles = makeStyles(() => ({
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
    border: '3px solid #fa6980',
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
    marginTop: 7,
  },
  formElements: {
    width: 240,
    height: 28,
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#333',
    border: 'none',
    borderBottom: '2px solid #fa6980',
    marginTop: 4,
  },
  editProfileButton: {
    height: 36,
    backgroundColor: '#fa6980',
    color: 'white',
  },
  saveButton: {},
  cancelButton: {
    backgroundColor: '#f6f8f9',
    color: 'darkgrey',
  },
  circularProgress: {
    color: 'white',
  },
}));

export default function PersonalInformation(props: any) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const applications = useSelector(fromApplications.selectApplications);

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      const response = await ProfileService.updateMyProfile(data);
      console.log(response);
      setIsSaving(false);
      setIsEditing(false);
    } catch (error) {
      setTimeout(() => {
        setIsSaving(false);
      }, 3000);
      console.log(error);
    }
  };

  const { profilePic: avatar, fullname, gender, age } = props.personalInformations as Profile;

  return (
    <Grid item xs={3}>
      <Card className={classes.personalInformationsCard}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Grid item xs>
              <Avatar
                className={classes.avatar}
                alt={typeof fullname === 'undefined' ? 'Unknown' : fullname}
                src={
                  //Default a question mark if no URL for avatar
                  typeof avatar === 'undefined' ? questionMark : avatar
                }
              />
            </Grid>
            <Grid item xs>
              <Typography className={classes.personalInformationTitle}>
                Name
              </Typography>
              {isEditing ? (
                <input
                  {...register('fullname')}
                  placeholder={fullname}
                  className={classes.formElements}
                />
              ) : (
                <Typography className={classes.personalInformationContent}>
                  {fullname}
                </Typography>
              )}
            </Grid>
            <Grid item xs>
              <Typography className={classes.personalInformationTitle}>
                Gender
              </Typography>
              {isEditing ? (
                <select
                  {...register('gender')}
                  className={classes.formElements}
                  defaultValue={gender}
                >
                  <option value="FEMALE">FEMALE</option>
                  <option value="MALE">MALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              ) : (
                <Typography className={classes.personalInformationContent}>
                  {gender}
                </Typography>
              )}
            </Grid>
            <Grid item xs>
              <Typography className={classes.personalInformationTitle}>
                Age
              </Typography>
              {isEditing ? (
                <input
                  {...register('age')}
                  value={age}
                  className={classes.formElements}
                />
              ) : (
                <Typography className={classes.personalInformationContent}>
                  {age}
                </Typography>
              )}
            </Grid>
            {isEditing ? null : (
              <Grid item xs>
                <Typography className={classes.personalInformationTitle}>
                  Joined Work
                </Typography>
                <Typography className={classes.personalInformationContent}>
                  { applications?.filter(application => (application.status === 'ACCEPTED')).length}
                </Typography>
              </Grid>
            )}
            <Grid item xs>
              {isEditing ? (
                <Grid container direction="row" spacing={3}>
                  <Grid item xs>
                    <Button
                      className={classes.editProfileButton}
                      disabled={isSaving}
                      type="submit"
                    >
                      {isSaving && (
                        <CircularProgress
                          size={14}
                          className={classes.circularProgress}
                        />
                      )}
                      {!isSaving && 'Save'}
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      className={classes.cancelButton}
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Button
                  className={classes.editProfileButton}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  EDIT PROFILE
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
