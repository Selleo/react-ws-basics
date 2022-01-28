import client from '../client';

export const fetchPosts = () => client.get('/posts');

export const fetchPost = ({ queryKey: [, param] }) =>
  client.get(`/posts/${param.postId}`);
