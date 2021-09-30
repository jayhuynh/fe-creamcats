import authReducer, * as fromAuth from './authSlice';
import positionsReducer, * as fromPositions from './positionsSlice';
import tagsReducer, * as fromTags from './tagsSlice';
import profileReducer, * as fromProfile from './profileSlice';
import postsReducer, * as fromPosts from './postsSlice';
import applicationsReducer, * as fromApplications from './applicationsSlice';
import notificationsReduce, * as fromNotifications from './notificationsSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [fromAuth.AUTH_FEATURE_KEY]: authReducer,
  [fromPositions.POSITIONS_FEATURE_KEY]: positionsReducer,
  [fromTags.TAGS_FEATURE_KEY]: tagsReducer,
  [fromProfile.PROFILE_FEATURE_KEY]: profileReducer,
  [fromPosts.POSTS_FEATURE_KEY]: postsReducer,
  [fromApplications.APPLICATIONS_FEATURE_KEY]: applicationsReducer,
  [fromNotifications.NOTIFICATIONS_FEATURE_KEY]: notificationsReduce,
});

export {
  fromAuth,
  fromPositions,
  fromTags,
  fromProfile,
  fromPosts,
  fromApplications,
  fromNotifications,
};
export default rootReducer;
