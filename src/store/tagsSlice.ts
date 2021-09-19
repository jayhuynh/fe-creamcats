import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Tag } from '../models';
import { TagService } from '../services';
import { AppState } from './index';

export const TAGS_FEATURE_KEY = 'tags';
interface TagsState {
  tags: Tag[];
  q: string;
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): TagsState => ({
  tags: [],
  q: '',
  loading: false,
  errors: [],
});

export const doFetchTags = createAsyncThunk(
  'tags/fetch',
  async (
    data,
    { rejectWithValue },
  ) => {
    try {
      const tags = await TagService.getTags();
      return {
        tags,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e)
        .toJson());
    }
  },
);

const tagsSlice = createSlice({
  name: TAGS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    // Fetch tags
    builder.addCase(doFetchTags.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchTags.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchTags.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.tags = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectTagsFeature = (state: AppState) => state[TAGS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectTagsFeature,
  state => state.loading,
);

export const selectTags = createSelector(
  selectTagsFeature,
  state => state.tags,
);

export default tagsSlice.reducer;

