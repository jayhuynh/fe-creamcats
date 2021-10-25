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

export const doFetchMyApplications = createAsyncThunk(
  'applications/fetch',
  async (
    data: {
      statusFilter: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const applications = await ApplicationService.getMyApplications(
        data.statusFilter,
      );
      return {
        applications,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

export const doCreateApplication = createAsyncThunk(
  'applications/create',
  async (
    data: {
      application: Parameters<typeof ApplicationService['createApplication']>[0];
    },
    { rejectWithValue },
  ) => {
    try {
      const application = await ApplicationService.createApplication(data.application);
      return {
        application,
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
    //Fetch my applications
    builder.addCase(doFetchMyApplications.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchMyApplications.fulfilled, (state, action) => {
      state.applications = action.payload.applications;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchMyApplications.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.applications = [];
      state.loading = false;
      state.errors.push(payload);
    });

    //Create application
    builder.addCase(doCreateApplication.pending, state => {
      state.loading = true;
    });
    builder.addCase(doCreateApplication.fulfilled, (state, action) => {
      state.applications = [action.payload.application, ...state.applications];
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doCreateApplication.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
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
