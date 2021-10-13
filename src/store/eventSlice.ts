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
  currentEvent: Event;
  events: Event[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): EventsState => ({
  currentEvent: {
    id: -1,
    name: '',
    description: '',
    gallery: [],
    organizationId: -1,
    startAt: new Date(),
    endAt: new Date(),
    location: '',
  },
  events: [],
  loading: false,
  errors: [],
});

export const doFetchEventById = createAsyncThunk(
  'events/fetchById',
  async (data: { eventId: number }, { rejectWithValue }) => {
    try {
      const event = await EventService.getEventById(data.eventId);
      return {
        event,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

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
    // Fetch event by Id
    builder.addCase(doFetchEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchEventById.fulfilled, (state, action) => {
      state.currentEvent = action.payload.event;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchEventById.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.currentEvent = {
        id: -1,
        name: '',
        description: '',
        gallery: [],
        organizationId: -1,
        startAt: new Date(),
        endAt: new Date(),
        location: '',
      };
      state.loading = false;
      state.errors.push(payload);
    });

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

export const selectCurrentEvent = createSelector(
  selectEventsFeature,
  state => state.currentEvent,
);
export const selectLoading = createSelector(
  selectEventsFeature,
  state => state.loading,
);

export const selectEvents = createSelector(
  selectEventsFeature,
  state => state.events,
);

export default eventsSlice.reducer;
