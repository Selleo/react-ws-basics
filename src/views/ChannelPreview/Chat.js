import { isArray } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { useGetChannelMessages } from '../../api/chennels';
import { Card } from '../../components';
import { ChatForm } from './ChatForm';

export const Chat = ({ channelId }) => {
  const { data } = useGetChannelMessages({ channelId });
  const [username] = useLocalStorage('username');
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback(
    ({ message }) => {
      console.log({ username, message });
    },
    [username]
  );

  useEffect(() => {
    if (isArray(data?.messages)) {
      setMessages(data.messages);
    }
  }, [data]);

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
