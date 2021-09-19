import {
  createAsyncThunk,
  createSelector,
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Position, Tag } from '../models';
import { PositionService } from '../services';
import { AppState } from './index';
import moment from 'moment';
import { FilterFormInputs } from '../pages/home/components/Filters';
import { QueryConfig, useNavigate } from '../routes';

export const POSITIONS_FEATURE_KEY = 'positions';

interface PositionsState {
  positions: Position[];
  filters: FilterFormInputs;
  currentPosition: any | null;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): PositionsState => ({
  positions: [],
  filters: {
    startingLocation: 'My address',
    distance: 10000,
    gender: 'male',
    tags: [],
    startDate: moment('2021-01-01T14:48:00.000Z').toDate(),
    endDate: moment('2022-01-01T14:48:00.000Z').add(7, 'days').toDate(),
    limit: 9,
    offset: 0,
    sort: 'applications',
    order: 'desc',
  },
  currentPosition: {
    id: 1,
    thumbnail: '',
    name: '',
    overview: '',
    releaseTime: new Date(),
    carousel: [],
    brief: [
      {
        type: 'Location',
        content: 'Unknown',
      },
      {
        type: 'Type of work',
        content: 'Unknown',
      },
      {
        type: 'Commitment',
        content: 'Unknown',
      },
      {
        type: 'Training',
        content: 'Unknown',
      },
      {
        type: 'Time required',
        content: 'Unknown',
      },
      {
        type: 'Number of applicants',
        content: 'Unknown',
      },
      {
        type: 'Others',
        content: 'Unknown',
      },
    ],
    eventId: 1,
    subtitle: '',
    organization: '',
    description: '',
    requirements: '',
    typesOfWork: [],
    createdAt: new Date(),
  },
  loading: false,
  errors: [],
});

export const doFetchPositions = createAsyncThunk(
  'positions/fetch',
  async (
    data,
    { rejectWithValue, getState }) => {
    try {
      const state: PositionsState = (getState() as any)[POSITIONS_FEATURE_KEY];
      const positions = await PositionService.getPositions(state.filters);
      return {
        positions,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e)
        .toJson());
    }
  },
);

export const doFetchCurrentPosition = createAsyncThunk(
  'positions/fetchCurrent',
  async (
    data: {
      id: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const position = await PositionService.getCurrentPosition(data.id);
      return {
        position,
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
  reducers: {
    doLoadMore: state => {
      state.filters.offset += state.filters.limit;
    },
    doChangeFilters: (state, action: PayloadAction<FilterFormInputs>) => {
      state.filters = action.payload;
    },
  },
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

    //Fetch current position
    builder.addCase(doFetchCurrentPosition.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchCurrentPosition.fulfilled, (state, action) => {
      state.currentPosition = action.payload.position;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchCurrentPosition.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.currentPosition = null;
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectPositionsFeature = (state: AppState) =>
  state[POSITIONS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectPositionsFeature,
  state => state.loading,
);

export const selectPositions = createSelector(
  selectPositionsFeature,
  state => state.positions,
);

export const selectFilters = createSelector(
  selectPositionsFeature,
  state => state.filters,
);

export const selectCurrentPosition = createSelector(
  selectPositionsFeature,
  state => state.currentPosition,
);

export const { doLoadMore, doChangeFilters } = positionsSlice.actions;
export default positionsSlice.reducer;
