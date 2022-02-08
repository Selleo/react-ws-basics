import { isObject } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPost } from '../api/posts';
import { Button } from '../components';

export const PostPreview = () => {
  const { postId } = useParams();
  const { data } = useGetPost({ postId });
  const [post, setPost] = useState({});

  const incrementPostLike = useCallback(() => {
    console.log(post);
  }, [post]);

  useEffect(() => {
    if (isObject(data?.post)) {
      setPost(data.post);
    }
  }, [data]);

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="py-4">
        <h3 className="font-bold text-2xl">{post.title}</h3>
        <div>
          <Button onClick={incrementPostLike}>Likes: {post.likes}</Button>
        </div>
        <div className="py-4">{post.description}</div>
      </div>
    </div>
  );
};
