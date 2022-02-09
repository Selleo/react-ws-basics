import { isArray } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInterval, useLocalStorage } from 'react-use';

import { useGetChannelMessages } from '../../api/chennels';
import { Card } from '../../components';
import { ChatForm } from './ChatForm';

export const Chat = ({ channelId }) => {
  const { data } = useGetChannelMessages({ channelId });
  const [username] = useLocalStorage('username');
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const [isCounterRunning, setIsCounterRunning] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');

  useInterval(
    () => {
      const counterNewValue = counter + 1;
      setCounter(counterNewValue);

      if (counterNewValue % 4 === 0) {
        setCounter(0);
        setTypingUsername('');
        setIsCounterRunning(false);
      }
    },
    isCounterRunning ? 1000 : null
  );

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

  const sendTypingMessage = useCallback(() => {
    wsRef.current.send(
      JSON.stringify({
        type: 'typing',
        payload: {
          username,
          channelId,
        },
      })
    );
  }, [channelId, username, wsRef]);

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
        case 'typing': {
          setTypingUsername(payload.username);
          setIsCounterRunning(true);
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
      {isCounterRunning && <div>{typingUsername} is typing</div>}
      <div>
        <ChatForm onSubmit={sendMessage} onMessageChange={sendTypingMessage} />
      </div>
      {messages.map((message, index) => (
        <Card key={index}>
          <strong>{message.username}</strong> {message.content}
        </Card>
      ))}
    </div>
  );
};
