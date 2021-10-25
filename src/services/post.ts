import Axios from 'axios';

import { Post } from '../models';
import { CreatePostFormInputs } from '../pages/sharing-zone/components/CreatePost';

export const getPosts = async () => {
  const posts: any = (await Axios.get('/posts/me')).data;
  return posts.map(
    (post: any) =>
      ({
        id: post.id,
        title: post.title,
        postCover: post.thumbnail,
        content: post.content,
      } as Post),
  );
};

export const getSharingZonePost = async () => {
  const posts: any = (await Axios.get('/posts', {
    params: {
      sort: 'timeCreated',
      order: 'desc',
    },
  })).data.data;
  const postWithUserProfile = await Promise.all(posts.map(async (post: any) => {
    const profile = (await Axios.get(`/users/${post.userId}`)).data;
    return {
      id: post.id,
      title: post.title,
      postCover: post.thumbnail,
      content: post.content,
      profile: { ...profile },
    } as Post;
  }));
  return postWithUserProfile;
};

export const createPost = async (data: CreatePostFormInputs) => {
  const response = (await Axios.post('/posts', {
    title: data.title,
    thumbnail: data.image,
    content: data.body,
    userId: data.userId,
  })).data;
  return {
    title: data.title,
    postCover: data.image,
    content: data.body,
  } as Post;
};
