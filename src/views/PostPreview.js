import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPost } from '../api/posts';

export const PostPreview = () => {
  const { postId } = useParams();
  const { data } = useGetPost({ postId });

  const post = useMemo(() => data?.post || {}, [data]);

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="py-4">
        <h3 className="font-bold text-2xl">{post.title}</h3>
        <div className="py-4">{post.description}</div>
      </div>
    </div>
  );
};
