import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

import { User, Token, SerializedException, exceptionOf } from '../models';
import { AuthService } from '../services';
import { AppState } from './index';

export const AUTH_FEATURE_KEY = 'auth';

interface AuthState {
  token: Token | null;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): AuthState => ({
  token: null,
  loading: false,
  errors: [],
});

export const doLogin = createAsyncThunk(
  'auth/login',
  async (
    data: {
      credential: Parameters<typeof AuthService['login']>[0],
      rememberMe: boolean
    },
    { rejectWithValue },
  ) => {
    try {
      const token = await AuthService.login(data.credential);
      Axios.defaults.headers.common.Authorization = `Bearer ${token.jwt}`;

      return token;
    } catch (e) {
      delete Axios.defaults.headers.common.Authorization;
      return rejectWithValue(exceptionOf(e)
        .toJson());
    }
  },
);

export const doResume = createAsyncThunk(
  'auth/resume',
  async (token: Token | undefined, { rejectWithValue }) => {
    try {
      const token = { jwt: 'this_is_jwt_token' } as Token;
      Axios.defaults.headers.common.Authorization = `Bearer ${token.jwt}`;

      return token;
    } catch (e) {
      delete Axios.defaults.headers.common.Authorization;
      return rejectWithValue(exceptionOf(e)
        .toJson());
    }
  },
);

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    // Login
    builder.addCase(doLogin.pending, state => {
      state.loading = true;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.token = null;
      state.loading = false;
      state.errors.push(payload);
    });

    // Resume
    builder.addCase(doResume.pending, state => {
      state.loading = true;
      state.errors = [];
    });
    builder.addCase(doResume.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
    });
    builder.addCase(doResume.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.token = null;
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectAuthFeature = (state: AppState) => state[AUTH_FEATURE_KEY];

export const selectLoading = createSelector(
  selectAuthFeature,
  state => state.loading,
);
export const selectErrors = createSelector(
  selectAuthFeature,
  state => state.errors,
);
export const selectIsTokenValid = createSelector(
  selectAuthFeature,
  authState => !!(authState.token),
);

export default authSlice.reducer;

