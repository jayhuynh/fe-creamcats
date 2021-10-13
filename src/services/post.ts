import Axios from 'axios';

import { Post } from '../models';
import { CreatePostFormInputs } from '../pages/sharing-zone/components/CreatePost';

export const getPosts = async () => {
  const posts: any = (await Axios.get('/posts/me')).data;
  return posts.map(
    (post: any) =>
      ({
        id: post.id,
        title: post.id,
        postCover: post.thumbnail,
        content: post.content,
      } as Post),
  );
};

export const createPost = async (data: CreatePostFormInputs) => {
  console.log('Created post', data);
  return {
    title: data.title,
    postCover: data.image,
    content: data.body,
  } as Post;
};
