import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Application } from '../models';
import { ApplicationService } from '../services';
import { AppState } from './index';

export const APPLICATIONS_FEATURE_KEY = 'applications';
interface ApplicationsState {
  applications: Application[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): ApplicationsState => ({
  applications: [],
  loading: false,
  errors: [],
});

export const doFetchApplications = createAsyncThunk(
  'applications/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const applications = await ApplicationService.getMockApplications(); // Won't be mock once token is ready
      return {
        applications,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const applicationsSlice = createSlice({
  name: APPLICATIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch posts
    builder.addCase(doFetchApplications.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchApplications.fulfilled, (state, action) => {
      state.applications = action.payload.applications;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchApplications.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.applications = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectApplicationsFeature = (state: AppState) =>
  state[APPLICATIONS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectApplicationsFeature,
  state => state.loading,
);

export const selectApplications = createSelector(
  selectApplicationsFeature,
  state => state.applications,
);

export default applicationsSlice.reducer;
