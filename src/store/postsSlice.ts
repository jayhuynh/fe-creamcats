import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { SerializedException, exceptionOf, Post } from '../models';
import { PostService } from '../services';
import { AppState } from './index';

export const POSTS_FEATURE_KEY = 'posts';
interface PostsState {
  posts: Post[];
  loading: boolean;
  errors: SerializedException[];
}

export const createInitialState = (): PostsState => ({
  posts: [],
  loading: false,
  errors: [],
});

export const doFetchPosts = createAsyncThunk(
  'posts/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const posts = await PostService.getMockPosts(); // Won't be mock once token is ready
      return {
        posts,
      };
    } catch (e) {
      return rejectWithValue(exceptionOf(e).toJson());
    }
  },
);

const postsSlice = createSlice({
  name: POSTS_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: builder => {
    //Fetch posts
    builder.addCase(doFetchPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(doFetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(doFetchPosts.rejected, (state, action) => {
      const payload = action.payload as SerializedException;
      state.posts = [];
      state.loading = false;
      state.errors.push(payload);
    });
  },
});

const selectPostsFeature = (state: AppState) => state[POSTS_FEATURE_KEY];

export const selectLoading = createSelector(
  selectPostsFeature,
  state => state.loading,
);

export const selectPosts = createSelector(
  selectPostsFeature,
  state => state.posts,
);

export default postsSlice.reducer;
