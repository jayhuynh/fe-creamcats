import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { exceptionOf, Profile, SerializedException } from '../models';
import { ProfileService } from '../services';
import { AppState } from './index';

export const PROFILE_FEATURE_KEY = 'profile';
interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): ProfileState => ({
  profile: null,
  loading: false,
  errors: [],
});

export const doFetchProfile = createAsyncThunk(
  'profile/fetch',
  async (data, { rejectWithValue }) => {
    try {
      return await ProfileService.getProfile();
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
      state.profile = null;
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

export const selectIsHasProfile = createSelector(
  selectProfileFeature,
  state => !!state.profile,
);

export default profileSlice.reducer;
