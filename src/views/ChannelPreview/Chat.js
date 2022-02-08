import { isArray } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { useGetChannelMessages } from '../../api/chennels';
import { Card } from '../../components';
import { ChatForm } from './ChatForm';

export const Chat = ({ channelId }) => {
  const { data } = useGetChannelMessages({ channelId });
  const [username] = useLocalStorage('username');
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const sendMessage = useCallback(
    ({ message }) => {
      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          payload: {
            content: message,
            username,
            channelId,
          },
        })
      );
    },
    [channelId, username, wsRef]
  );

  useEffect(() => {
    if (isArray(data?.messages)) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('connect');

      ws.send(
        JSON.stringify({
          type: 'connect',
          payload: {
            channelId,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'message': {
          setMessages((prevValue) => [...prevValue, payload]);
          break;
        }
        default: {
          console.log(`Unknown response type: ${type}`);
          break;
        }
      }
    };

    wsRef.current = ws;

    return () => {
      console.log('disconnect');
      ws.close();
    };
  }, [channelId]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <ChatForm onSubmit={sendMessage} />
      </div>
      {messages.map((message, index) => (
        <Card key={index}>
          <strong>{message.username}</strong> {message.content}
        </Card>
      ))}
    </div>
  );
};
