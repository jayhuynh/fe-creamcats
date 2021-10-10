import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import Axios from 'axios';

import { User, Token, SerializedException, exceptionOf } from '../models';
import { AuthService } from '../services';
import { AppState } from './index';
import { selectProfile, selectProfileFeature } from './profileSlice';
import { profile } from '../routes';

export const AUTH_FEATURE_KEY = 'auth';

const TOKEN = 'cc.login';
export const TYPE = 'cc.type';

interface AuthState {
  organizationId?: Number;
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
      credential: Parameters<typeof AuthService['login']>[0];
      rememberMe: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = await AuthService.login(data.credential);
      Axios.defaults.headers.common.Authorization = `Bearer ${token.jwt}`;
      if (data.rememberMe) {
        localStorage.setItem(TOKEN, JSON.stringify(token));
        localStorage.setItem(TYPE, JSON.stringify(data.credential.type));
      }

      return token;
    } catch (e) {
      delete Axios.defaults.headers.common.Authorization;
      localStorage.removeItem(TOKEN);
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

export const doResume = createAsyncThunk(
  'auth/resume',
  async (token: Token | undefined, { rejectWithValue }) => {
    try {
      const userToken =
        token ?? (JSON.parse(localStorage.getItem(TOKEN) || 'null') as Token);
      Axios.defaults.headers.common.Authorization = `Bearer ${userToken.jwt}`;

      return userToken;
    } catch (e) {
      delete Axios.defaults.headers.common.Authorization;
      localStorage.removeItem(TOKEN);
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

export const doFetchOrganizationId = createAsyncThunk(
  'auth/FetchOrganizationId',
  async (data, { rejectWithValue }) => {
    try {
      const organizationId = await AuthService.getOrganizationId();
      return organizationId;
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
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

    // Fetch organization ID
    builder.addCase(doFetchOrganizationId.pending, state => {
      state.loading = true;
      state.errors = [];
    });
    builder.addCase(doFetchOrganizationId.fulfilled, (state, action) => {
      state.organizationId = action.payload;
      state.loading = false;
    });
    builder.addCase(doFetchOrganizationId.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.organizationId = -1;
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectAuthFeature = (state: AppState) => state[AUTH_FEATURE_KEY];

export const selectOrganizationId = createSelector(
  selectAuthFeature,
  state => state.organizationId,
);

export const selectLoading = createSelector(
  selectAuthFeature,
  state => state.loading,
);
export const selectErrors = createSelector(
  selectAuthFeature,
  state => state.errors,
);
export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  selectProfileFeature,
  (authState, profileState) =>
    !!(profileState.profile && authState.token) ||
    !!localStorage.getItem(TOKEN),
);

export default authSlice.reducer;
