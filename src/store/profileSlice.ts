import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Profile } from '../models';
import { ProfileService } from '../services';
import { AppState } from './index';

export const PROFILE_FEATURE_KEY = 'profile';
interface ProfileState {
  profile: Profile;
  loading: boolean;
  errors: SerializedException[];
}

// Create this object to simplify code. Not sure if this is the right way to do it.
const initialProfile = {
  id: -1,
  email: '',
  fullname: '',
  gender: '',
  age: -1,
  password: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createInitialState = (): ProfileState => ({
  profile: initialProfile,
  loading: false,
  errors: [],
});

export const doFetchProfile = createAsyncThunk(
  'profile/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const profile = await ProfileService.getMockProfile(); // Will be getProfile() when API is ready
      return profile;
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const profileSlice = createSlice({
  name: PROFILE_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch profile
    builder.addCase(doFetchProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchProfile.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.profile = initialProfile;
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectProfileFeature = (state: AppState) => state[PROFILE_FEATURE_KEY];

export const selectLoading = createSelector(
  selectProfileFeature,
  state => state.loading,
);

export const selectProfile = createSelector(
  selectProfileFeature,
  state => state.profile,
);

export default profileSlice.reducer;
