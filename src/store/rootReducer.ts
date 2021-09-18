import authReducer, * as fromAuth from './authSlice';
import positionsReducer, * as fromPositions from './positionsSlice';
import tagsReducer, * as fromTags from './tagsSlice';
import profileReducer, * as fromProfile from './profileSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [fromAuth.AUTH_FEATURE_KEY]: authReducer,
  [fromPositions.POSITIONS_FEATURE_KEY]: positionsReducer,
  [fromTags.TAGS_FEATURE_KEY]: tagsReducer,
  [fromProfile.PROFILE_FEATURE_KEY]: profileReducer,
});

export {
  fromAuth,
  fromPositions,
  fromTags,
  fromProfile,
};
export default rootReducer;
