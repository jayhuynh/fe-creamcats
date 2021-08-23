import authReducer, * as fromAuth from './authSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [fromAuth.AUTH_FEATURE_KEY]: authReducer,
});

export { fromAuth };
export default rootReducer;
