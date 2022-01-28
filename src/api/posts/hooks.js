import { useQuery } from 'react-query';

import { handleSelectors } from '../shared';
import { fetchPost, fetchPosts } from './requests';
import { getPost, getPosts } from './selectors';

export const useGetPosts = ({
  selectors = { posts: getPosts },
  ...options
} = {}) =>
  useQuery('posts', fetchPosts, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetPost = ({
  postId,
  selectors = { post: getPost },
  ...options
} = {}) =>
  useQuery(['post', { postId }], fetchPost, {
    select: handleSelectors(selectors),
    ...options,
  });
