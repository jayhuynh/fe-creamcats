import authReducer, * as fromAuth from './authSlice';
import positionsReducer, * as fromPositions from './positionsSlice';
import tagsReducer, * as fromTags from './tagsSlice';
import profileReducer, * as fromProfile from './profileSlice';
import postsReducer, * as fromPosts from './postsSlice';
import applicationsReducer, * as fromApplications from './applicationsSlice';
import notificationsReducer, * as fromNotifications from './notificationsSlice';
import voluntaryEventsReducer, * as fromVoluntaryEvents from './voluntaryEventsSlice';
import organizationApplicationsReducer, * as fromOrganizationApplications from './organizationApplicationSlice';
import organizationPositionsReducer, * as fromOrganizationPositions from './organizationPositionsSlice';
import eventsReducer, * as fromEvents from './eventSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [fromAuth.AUTH_FEATURE_KEY]: authReducer,
  [fromPositions.POSITIONS_FEATURE_KEY]: positionsReducer,
  [fromTags.TAGS_FEATURE_KEY]: tagsReducer,
  [fromProfile.PROFILE_FEATURE_KEY]: profileReducer,
  [fromPosts.POSTS_FEATURE_KEY]: postsReducer,
  [fromApplications.APPLICATIONS_FEATURE_KEY]: applicationsReducer,
  [fromNotifications.NOTIFICATIONS_FEATURE_KEY]: notificationsReducer,
  [fromVoluntaryEvents.VOLUNTARY_EVENTS_FEATURE_KEY]: voluntaryEventsReducer,
  [fromOrganizationApplications.ORGANIZATION_APPLICATIONS_FEATURE_KEY]:
    organizationApplicationsReducer,
  [fromOrganizationPositions.ORGANIZATION_POSITIONS_FEATURE_KEY]:
    organizationPositionsReducer,
  [fromEvents.EVENTS_FEATURE_KEY]: eventsReducer,
});

export {
  fromAuth,
  fromPositions,
  fromTags,
  fromProfile,
  fromPosts,
  fromApplications,
  fromNotifications,
  fromVoluntaryEvents,
  fromOrganizationApplications,
  fromOrganizationPositions,
  fromEvents,
};
export default rootReducer;
