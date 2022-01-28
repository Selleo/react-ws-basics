const paths = {
  root: '/',
  posts: '/posts',
  post: (postId = null) => (postId ? `/posts/${postId}` : '/posts/:postId'),
};

export default paths;
