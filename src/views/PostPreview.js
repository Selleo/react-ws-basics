import { isObject } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPost } from '../api/posts';
import { Button } from '../components';

export const PostPreview = () => {
  const { postId } = useParams();
  const { data } = useGetPost({ postId });
  const post = data?.post || {};

  const [likes, setLikes] = useState(null);
  const wsRef = useRef(null);

  const incrementPostLike = useCallback(() => {
    wsRef.current.send(
      JSON.stringify({
        type: 'incrementLike',
        payload: { postId: post.id, likes },
      })
    );
  }, [post, likes]);

  useEffect(() => {
    if (isObject(data?.post)) {
      setLikes(data.post.likes);
    }
  }, [data]);

  useEffect(() => {
    if (post.id) {
      const ws = new WebSocket('ws://localhost:8080');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('connect');
        ws.send(
          JSON.stringify({
            type: 'connect',
            payload: {
              postId: post.id,
            },
          })
        );
      };

      ws.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data);

        switch (type) {
          case 'incrementLike': {
            setLikes(payload.likes);
            break;
          }
          default: {
            console.warn(`Unknown action type: ${type}`);
            break;
          }
        }
      };
    }

    return () => {
      wsRef.current?.close();
    };
  }, [post]);

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="py-4">
        <h3 className="font-bold text-2xl">{post.title}</h3>
        <div>
          <Button onClick={incrementPostLike}>Likes: {likes}</Button>
        </div>
        <div className="py-4">{post.description}</div>
      </div>
    </div>
  );
};
