import {
  createAsyncThunk,
  createSelector,
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf } from '../models';
import { PositionService } from '../services';
import { AppState } from './index';
import { RegisterInputForm } from '../pages/login/components/Register';
import { CreatePositionFormInputs } from '../pages/event/components/CreatePositionDialog';

export const ORGANIZATION_POSITIONS_FEATURE_KEY = 'organizationPositions';

interface OrganizationsPositionsState {
  eventPositions: any[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): OrganizationsPositionsState => ({
  eventPositions: [],
  loading: false,
  errors: [],
});

export const doFetchEventPositions = createAsyncThunk(
  'organizationPositions/fetch',
  async (
    data: {
      eventId: Number;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const eventPositions = await PositionService.getEventPositions(
        data.eventId,
      );
      return {
        eventPositions,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);
//
// export const deCreateEventPosition = createAsyncThunk(
//   'organizationPositions/create',
//   async (
//     data: {
//       position: CreatePositionFormInputs;
//     },
//     { rejectWithValue, getState },
//   ) => {
//     try {
//       const eventPositions = await PositionService.getEventPositions(
//         data.eventId,
//       );
//       return {
//         eventPositions,
//       };
//     } catch (e) {
//       return rejectWithValue(exceptionOf(e).toJson());
//     }
//   },
// );

const organizationPositionsSlice = createSlice({
  name: ORGANIZATION_POSITIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch organization positions
    builder.addCase(doFetchEventPositions.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchEventPositions.fulfilled, (state, action) => {
      state.eventPositions = action.payload.eventPositions;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchEventPositions.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.eventPositions = [];
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

export const selectEventPositions = createSelector(
  selectOrganizationPositionsFeature,
  state => state.eventPositions,
);

export default organizationPositionsSlice.reducer;
