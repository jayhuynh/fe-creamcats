import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Position } from '../models';
import { PositionService } from '../services';
import { AppState } from './index';

export const POSITIONS_FEATURE_KEY = 'positions';
interface PositionsState {
  positions: Position[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): PositionsState => ({
  positions: [],
  loading: false,
  errors: [],
});

export const doFetchPositions = createAsyncThunk(
  'positions/fetch',
  async (
    data,
    { rejectWithValue },
  ) => {
    try {
      const positions = await PositionService.getPositions();
      return {
        positions,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e)
        .toJson());
    }
  },
);

const positionsSlice = createSlice({
  name: POSITIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    // Fetch position
    builder.addCase(doFetchPositions.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchPositions.fulfilled, (state, action) => {
      state.positions = action.payload.positions;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchPositions.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.positions = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectPositionsFeature = (state: AppState) => state[POSITIONS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectPositionsFeature,
  state => state.loading,
);

export const selectPositions = createSelector(
  selectPositionsFeature,
  state => state.positions,
);

export default positionsSlice.reducer;

