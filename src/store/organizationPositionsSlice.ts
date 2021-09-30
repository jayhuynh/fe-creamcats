import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf } from '../models';
import { PositionService } from '../services';
import { AppState } from './index';

export const ORGANIZATION_POSITIONS_FEATURE_KEY = 'organizationPositions';

interface OrganizationsPositionsState {
  organizationPositions: any[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): OrganizationsPositionsState => ({
  organizationPositions: [],
  loading: false,
  errors: [],
});

export const doFetchOrganizationPositions = createAsyncThunk(
  'organizationPositions/fetch',
  async (
    data: {
      organizationId: Number;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const organizationPositions =
        await PositionService.getOrganizationPositions(data.organizationId);
      return {
        organizationPositions,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const organizationPositionsSlice = createSlice({
  name: ORGANIZATION_POSITIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch organization positions
    builder.addCase(doFetchOrganizationPositions.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchOrganizationPositions.fulfilled, (state, action) => {
      state.organizationPositions = action.payload.organizationPositions;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchOrganizationPositions.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.organizationPositions = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectOrganizationPositionsFeature = (state: AppState) =>
  state[ORGANIZATION_POSITIONS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectOrganizationPositionsFeature,
  state => state.loading,
);

export const selectOrganizationPositions = createSelector(
  selectOrganizationPositionsFeature,
  state => state.organizationPositions,
);

export default organizationPositionsSlice.reducer;
