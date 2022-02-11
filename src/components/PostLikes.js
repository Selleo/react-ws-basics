import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './Button';

export const PostLikes = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const wsRef = useRef(null);

  const incrementPostLike = useCallback(() => {
    wsRef.current.send(
      JSON.stringify({
        type: 'incrementLike',
        payload: { postId: postId, likes },
      })
    );
  }, [postId, likes]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('connect');
      ws.send(
        JSON.stringify({
          type: 'connect',
          payload: {
            postId: postId,
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

    return () => {
      wsRef.current.close();
    };
  }, [postId]);

  return (
    <div>
      <Button onClick={incrementPostLike}>Likes: {likes}</Button>
    </div>
  );
};
