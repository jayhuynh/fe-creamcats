import {
  createAsyncThunk, createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, VoluntaryEvent } from '../models';
import { VoluntaryEventService } from '../services';
import { AppState } from './index';
import { EntityState } from '@reduxjs/toolkit/dist/entities';

export const VOLUNTARY_EVENTS_FEATURE_KEY = 'voluntaryEvents';

interface VoluntaryEventsState extends EntityState<VoluntaryEvent>{
  loading: boolean;
  errors: SerializedException[];
  total: number;
}

const voluntaryEventAdapter = createEntityAdapter<VoluntaryEvent>();

export const createInitialState = (): VoluntaryEventsState => voluntaryEventAdapter.getInitialState({
  loading: false,
  errors: [],
  total: 0,
});

export const getVoluntaryEvents = createAsyncThunk(
  'voluntaryEvents/fetch',
  async (
    data: {
      organizationId: number,
    },
    { rejectWithValue },
  ) => {
    try {
      return  await VoluntaryEventService.getOrganizationVoluntaryEvents(data.organizationId);
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const voluntaryEventsSlice = createSlice({
  name: VOLUNTARY_EVENTS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch my voluntaryEvents
    builder.addCase(getVoluntaryEvents.pending, state => {
      state.loading = true;
    });
    builder.addCase(getVoluntaryEvents.fulfilled, (state, action) => {
      voluntaryEventAdapter.removeAll(state);
      voluntaryEventAdapter.addMany(state, action.payload.data);
      state.total = action.payload.total;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(getVoluntaryEvents.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectVoluntaryEventsFeature = (state: AppState) =>
  state[VOLUNTARY_EVENTS_FEATURE_KEY];
const { selectAll } = voluntaryEventAdapter.getSelectors(selectVoluntaryEventsFeature);

export const selectLoading = createSelector(
  selectVoluntaryEventsFeature,
  state => state.loading,
);

export const selectAllVoluntaryEvents = selectAll;

export default voluntaryEventsSlice.reducer;
