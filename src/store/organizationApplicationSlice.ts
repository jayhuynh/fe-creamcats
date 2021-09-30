import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  SerializedException,
  exceptionOf,
  OrganizationApplication,
} from '../models';

import { OrganizationApplicationService } from '../services';
import { AppState } from './index';
import { SubFilterFormInputs } from '../pages/profile/components/applications/application-filter/Filters';
import { FilterFormInputs } from '../pages/profile/components/applications/ApplicationSearchArea';

export const ORGANIZATION_APPLICATIONS_FEATURE_KEY = 'organizationApplications';

interface OrganizationApplicationsState {
  organizationApplications: OrganizationApplication[];
  number: number;
  filters: any;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): OrganizationApplicationsState => ({
  organizationApplications: [],
  filters: {
    keyword: '',
    sortBy: '',
    gender: '',
    event: -1,
    position: -1,
  },
  number: 0,
  loading: false,
  errors: [],
});

export const doFetchOrganizationApplications = createAsyncThunk(
  'organizationApplications/fetch',
  async (
    data: {
      organizationId: number;
      filters: any;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const state: OrganizationApplicationsState = (getState() as any)[
        ORGANIZATION_APPLICATIONS_FEATURE_KEY
      ];
      const organizationApplications =
        await OrganizationApplicationService.getMockOrganizationApplications(
          data.organizationId,
          state.filters,
        ); // Won't be mock once token is ready
      return {
        organizationApplications,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const organizationApplicationsSlice = createSlice({
  name: ORGANIZATION_APPLICATIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {
    doChangeFilters: (state, action: PayloadAction<FilterFormInputs>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    doChangeSubFilters: (state, action: PayloadAction<SubFilterFormInputs>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: builder => {
    //Fetch applications sent to an organization
    builder.addCase(doFetchOrganizationApplications.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      doFetchOrganizationApplications.fulfilled,
      (state, action) => {
        state.organizationApplications =
          action.payload.organizationApplications.organizationApplications;
        state.number = action.payload.organizationApplications.number;
        state.loading = false;
        state.errors = [];
      },
    );
    builder.addCase(
      doFetchOrganizationApplications.rejected,
      (state, action) => {
        const payload = action.payload as SerializedException;
        state.organizationApplications = [];
        state.number = 0;
        state.loading = false;
        state.errors.push(payload);
      },
    );
  },
});

const selectOrganizationApplicationsFeature = (state: AppState) =>
  state[ORGANIZATION_APPLICATIONS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectOrganizationApplicationsFeature,
  state => state.loading,
);

export const selectFilters = createSelector(
  selectOrganizationApplicationsFeature,
  state => state.filters,
);

export const selectNumber = createSelector(
  selectOrganizationApplicationsFeature,
  state => state.number,
);

export const selectOrganizationApplications = createSelector(
  selectOrganizationApplicationsFeature,
  state => state.organizationApplications,
);

export const { doChangeFilters, doChangeSubFilters } =
  organizationApplicationsSlice.actions;
export default organizationApplicationsSlice.reducer;
