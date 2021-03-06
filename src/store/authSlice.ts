import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Axios from 'axios';

import { User, Token, SerializedException, exceptionOf, Profile, Organization } from '../models';
import { RegisterInputForm } from '../pages/login/components/Register';
import { VolunteerProfileInputForm } from '../pages/login/components/CreateVolunteerProfile';
import { OrganizationProfileInputForm } from '../pages/login/components/CreateOrganizationProfile';

import { AuthService, ProfileService } from '../services';
import { AppState, fromProfile } from './index';
import { selectProfile, selectProfileFeature } from './profileSlice';
import { profile } from '../routes';

export const AUTH_FEATURE_KEY = 'auth';

export const TOKEN = 'cc.login';
export const TYPE = 'cc.type';

interface AuthState {
  organizationId?: Number;
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
    gender: 'male',
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

export const doRegister = createAsyncThunk(
  'auth/register',
  async (
    data: {
      credential: Parameters<typeof AuthService['login']>[0],
      profile: any,
    },
    { rejectWithValue },
  ) => {
    try {
      const token = await AuthService.register(data.credential);
      console.log(token);
      Axios.defaults.headers.common.Authorization = `Bearer ${token.jwt}`;
      localStorage.setItem(TOKEN, JSON.stringify(token));
      localStorage.setItem(TYPE, JSON.stringify(data.credential.type));


      if (data.credential.type === 'volunteer') {
        await ProfileService.updateMyProfile(data.profile);
      } else {
        const { id } = await ProfileService.getOrganizationProfile();
        await ProfileService.updateOrganizationProfile({
          ...data.profile,
          id,
        } as Organization);
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

export const doLogout = createAsyncThunk(
  'auth/logout',
  async (
    data,
    { rejectWithValue },
  ) => {
    fromProfile.doCleanProfile();
    delete Axios.defaults.headers.common.Authorization;
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TYPE);
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

    // Register
    builder.addCase(doRegister.pending, state => {
      state.loading = true;
    });
    builder.addCase(doRegister.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doRegister.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.token = null;
      state.loading = false;
      state.errors.push(payload);
    });

    // Logout
    builder.addCase(doLogout.pending, state => {
      state.loading = true;
    });
    builder.addCase(doLogout.fulfilled, (state, action) => {
      state.token = null;
      state.register = createInitialState().register;
      state.volunteerProfile = createInitialState().volunteerProfile;
      state.organizationProfile = createInitialState().organizationProfile;
      state.loading = false;
      state.errors = [];
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
