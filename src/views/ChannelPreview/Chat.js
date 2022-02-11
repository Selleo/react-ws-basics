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
  const containerRef = useRef(null);

  const sendMessage = useCallback(
    ({ message }) => {
      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          payload: {
            channelId,
            username,
            content: message,
          },
        })
      );
    },
    [channelId, username]
  );

  useEffect(() => {
    if (isArray(data?.messages)) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
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
          setMessages((prevState) => [...prevState, payload]);
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          break;
        }
        default: {
          console.warn(`Unknown action type: ${type}`);
          break;
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [channelId]);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex-grow overflow-auto" ref={containerRef}>
        {messages.map((message, index) => (
          <Card key={index}>
            <strong>{message.username}</strong> {message.content}
          </Card>
        ))}
      </div>

      <div>
        <ChatForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};
