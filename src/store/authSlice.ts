import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Axios from 'axios';

import { User, Token, SerializedException, exceptionOf } from '../models';
import { RegisterInputForm } from '../pages/login/components/Register';
import { VolunteerProfileInputForm } from '../pages/login/components/CreateVolunteerProfile';
import { OrganizationProfileInputForm } from '../pages/login/components/CreateOrganizationProfile';

import { AuthService } from '../services';
import { AppState } from './index';
import { selectProfile, selectProfileFeature } from './profileSlice';
import { profile } from '../routes';

export const AUTH_FEATURE_KEY = 'auth';

const TOKEN = 'cc.login';

interface AuthState {
  token: Token | null;
  register: RegisterInputForm;
  volunteerProfile: VolunteerProfileInputForm;
  organizationProfile: OrganizationProfileInputForm;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): AuthState => ({
  token: null,
  register: {
    type: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  volunteerProfile: {
    avatar: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: '',
  },
  organizationProfile: {
    avatar: '',
    name: '',
    address: '',
    description: '',
  },
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
      if (data.rememberMe) localStorage.setItem(TOKEN, JSON.stringify(token));

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
      localStorage.setItem(TOKEN, JSON.stringify(userToken));

      return userToken;
    } catch (e) {
      delete Axios.defaults.headers.common.Authorization;
      localStorage.removeItem(TOKEN);
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {
    doChangeRegister: (state, action: PayloadAction<RegisterInputForm>) => {
      state.register = action.payload;
    },

    doChangeVolunteerProfile: (
      state,
      action: PayloadAction<VolunteerProfileInputForm>,
    ) => {
      state.volunteerProfile = action.payload;
    },
    doChangeOrganizationProfile: (
      state,
      action: PayloadAction<OrganizationProfileInputForm>,
    ) => {
      state.organizationProfile = action.payload;
    },
  },
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
export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  selectProfileFeature,
  (authState, profileState) =>
    !!(profileState.profile && authState.token) ||
    !!localStorage.getItem(TOKEN),
);

export const selectRegister = createSelector(
  selectAuthFeature,
  state => state.register,
);
export const selectVolunteerProfile = createSelector(
  selectAuthFeature,
  state => state.volunteerProfile,
);
export const selectOrganizationProfile = createSelector(
  selectAuthFeature,
  state => state.organizationProfile,
);

export const {
  doChangeRegister,
  doChangeVolunteerProfile,
  doChangeOrganizationProfile,
} = authSlice.actions;
export default authSlice.reducer;
