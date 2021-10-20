import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Card, Avatar, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ProfileService } from '../../../services';
import { Organization, Profile } from '../../../models';
import { useSelector } from 'react-redux';
import { fromProfile } from '../../../store';

const questionMark =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png';

const useStyles = makeStyles(() => ({
  personalInformationsCard: {
    backgroundColor: 'white',
    paddingTop: 43,
    boxShadow: 'none',
    paddingBottom: 50,
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
  contentOverwrite: {
    fontSize: 14,
    fontWeight: 'normal',
    width: 210,
    wordBreak: 'break-word',
  },
  formElements: {
    width: 240,
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#333 !important',
    border: 'none',
    borderBottom: '2px solid #fa6980',
    marginTop: 4,
    resize: 'none',
  },
  editProfileButton: {
    color: 'white',
    boxShadow: 'none',
    background: '#fa6980',
    fontSize: 12,
    padding: '12px 40px',
    minWidth:111,
    minHeight:46,
    '&:hover': {
      background: '#fa6980',
    },
  },
  saveButton: {},
  cancelButton: {
    backgroundColor: '#f6f8f9',
    color: 'darkgrey',
    fontSize: 12,
    minHeight:46,
    padding: '12px 25px',
  },
  circularProgress: {
    color: 'white',
  },
}));

export default function OrganizationInformation() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const profile: any = useSelector(fromProfile.selectProfile) || {};

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

  return (
    <Card className={classes.personalInformationsCard}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs>
            <Avatar
              className={classes.avatar}
              alt={typeof profile.email === 'undefined' ? 'Unknown' : profile.email}
              src={
                //Default a question mark if no URL for avatar
                typeof profile.avatar === 'undefined' ? questionMark : profile.avatar
              }
            />
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>Email</Typography>
            {isEditing ? (
              <input
                {...register('email')}
                placeholder={profile.email}
                type="email"
                className={`${classes.formElements}`}
              />
            ) : (
              <Typography className={`${classes.personalInformationContent} ${classes.contentOverwrite}`}>
                {profile.email}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>Phone</Typography>
            {isEditing ? (
              <input {...register('phone')} value={profile.phone} className={classes.formElements} />
            ) : (
              <Typography className={`${classes.personalInformationContent} ${classes.contentOverwrite}`}>
                {profile.phone}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>Address</Typography>
            {isEditing ? (
              <select {...register('addr')} className={classes.formElements} defaultValue={profile.addr}>
                <option value="FEMALE">FEMALE</option>
                <option value="MALE">MALE</option>
                <option value="OTHER">OTHER</option>
              </select>
            ) : (
              <Typography className={`${classes.personalInformationContent} ${classes.contentOverwrite}`}>
                {profile.addr}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            <Typography className={classes.personalInformationTitle}>Description</Typography>
            {isEditing ? (
              <textarea {...register('desc')} value={profile.desc} rows={5} className={classes.formElements} />
            ) : (
              <Typography className={`${classes.personalInformationContent} ${classes.contentOverwrite}`}>
                {profile.desc}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            {isEditing ? (
              <Grid container direction="row" spacing={3}>
                <Grid item xs>
                  <Button className={classes.editProfileButton} disabled={isSaving} type="submit">
                    {isSaving && <CircularProgress size={14} className={classes.circularProgress} />}
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
                color="secondary"
                variant="contained"
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
  );
}
