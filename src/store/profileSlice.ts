import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { exceptionOf, Organization, Profile, SerializedException, User } from '../models';
import { AuthService, ProfileService } from '../services';
import { AppState } from './index';

export const PROFILE_FEATURE_KEY = 'profile';
interface ProfileState {
  profile: Profile | null | Organization;
  type: User['type'];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): ProfileState => ({
  profile: null,
  type: '',
  loading: false,
  errors: [],
});

export const doFetchMyProfile = createAsyncThunk(
  'profile/fetch',
  async (data: {
    type: User['type'],
  },
  { rejectWithValue }) => {
    try {
      console.log(data.type);
      const profile = data.type === 'volunteer'
        ? await ProfileService.getMyProfile()
        : await ProfileService.getOrganizationProfile();
      return  {
        profile,
        type: data.type,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const profileSlice = createSlice({
  name: PROFILE_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {
    doCleanProfile: state => {
      state.profile = null;
    },
  },
  extraReducers: builder => {
    //Fetch profile
    builder.addCase(doFetchMyProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchMyProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.type = action.payload.type;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchMyProfile.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.profile = null;
      state.type = '';
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

export const selectProfileFeature = (state: AppState) => state[PROFILE_FEATURE_KEY];

export const selectLoading = createSelector(
  selectProfileFeature,
  state => state.loading,
);

export const selectProfile = createSelector(
  selectProfileFeature,
  state => state.profile,
);

export const { doCleanProfile } = profileSlice.actions;
export default profileSlice.reducer;
