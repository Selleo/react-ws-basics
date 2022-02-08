import { isObject } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPost } from '../api/posts';
import { Button } from '../components';

export const PostPreview = () => {
  const { postId } = useParams();
  const { data } = useGetPost({ postId });
  const [post, setPost] = useState({});
  const wsRef = useRef(null);

  const incrementPostLike = useCallback(() => {
    wsRef.current.send(
      JSON.stringify({
        type: 'incrementLike',
        payload: { post },
      })
    );
  }, [post, wsRef]);

  useEffect(() => {
    if (isObject(data?.post)) {
      setPost(data.post);
    }
  }, [data]);

  useEffect(() => {
    if (post.id) {
      const ws = new WebSocket('ws://localhost:8080');

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
            setPost((prevValue) => ({ ...prevValue, likes: payload.likes }));
            break;
          }
          default: {
            console.log(`Unknown response type: ${type}`);
            break;
          }
        }
      };

      wsRef.current = ws;
    }

    return () => {
      if (post.id) {
        console.log('disconnect');
        wsRef.current.close();
      }
    };
  }, [post.id]);

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
