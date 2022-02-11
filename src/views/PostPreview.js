import { isObject } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPost } from '../api/posts';
import { PostLikes } from '../components/PostLikes';

export const PostPreview = () => {
  const { postId } = useParams();
  const { data, isSuccess } = useGetPost({ postId });
  const post = data?.post || {};

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="py-4">
        <h3 className="font-bold text-2xl">{post.title}</h3>
        <div>
          <PostLikes postId={Number(postId)} initialLikes={post.likes} />
        </div>
        <div className="py-4">{post.description}</div>
      </div>
    </div>
  );
};
