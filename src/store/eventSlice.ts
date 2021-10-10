import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Event, Tag } from '../models';
import { EventService } from '../services';
import { AppState } from './index';

export const EVENTS_FEATURE_KEY = 'events';

interface EventsState {
  events: Event[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): EventsState => ({
  events: [],
  loading: false,
  errors: [],
});

export const doFetchEvents = createAsyncThunk(
  'events/fetch',
  async (data: { organizationId: number }, { rejectWithValue, getState }) => {
    try {
      const events = await EventService.getEvents(data.organizationId);
      return {
        events,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const eventsSlice = createSlice({
  name: EVENTS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    // Fetch event
    builder.addCase(doFetchEvents.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchEvents.fulfilled, (state, action) => {
      state.events = action.payload.events;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchEvents.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.events = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectEventsFeature = (state: AppState) => state[EVENTS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectEventsFeature,
  state => state.loading,
);

export const selectEvents = createSelector(
  selectEventsFeature,
  state => state.events,
);

export default eventsSlice.reducer;
