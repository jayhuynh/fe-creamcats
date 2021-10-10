import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './index';

export const NOTIFICATIONS_FEATURE_KEY = 'notifications';

export enum NotificationsType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface Notification {
  message: string;
  key: number;
  type: NotificationsType
}

interface NotificationsState {
  notificationsPack: Notification[];
}

export const createInitialState = (): NotificationsState => ({
  notificationsPack: [],
});

const notificationsSlice = createSlice({
  name: NOTIFICATIONS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {
    doPushNotification: (state: NotificationsState, action: PayloadAction<Notification>) => {
      state.notificationsPack = [...state.notificationsPack, action.payload];
    },
    doSetNotification: (state: NotificationsState) => {
      state.notificationsPack = state.notificationsPack.slice(1);
    },
  },
});

const selectNotificationsFeature = (state: AppState) => state[NOTIFICATIONS_FEATURE_KEY];

export const selectNotificationPack = createSelector(
  selectNotificationsFeature,
  state => state.notificationsPack,
);

export const { doSetNotification, doPushNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;

