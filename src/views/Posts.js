import React from 'react';
import { Link } from 'react-router-dom';

import { useGetPosts } from '../api/posts';
import { Card } from '../components';
import paths from '../routes/paths';

export const Posts = () => {
  const { data } = useGetPosts();

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      {!!data && (
        <div className="flex flex-col items-center">
          {data.posts.map((post, index) => (
            <Card
              key={index}
              title={<Link to={paths.post(post.id)}>{post.title}</Link>}
              image={post.image}
              content={post.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
