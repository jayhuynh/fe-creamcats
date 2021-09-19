import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer, { fromAuth, fromPositions, fromTags } from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';
const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export { fromAuth, fromPositions, fromTags };
export default store;

