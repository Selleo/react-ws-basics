import React, { useMemo } from 'react';

import { useGetChannelMessages } from '../../api/chennels';
import { Card } from '../../components';

export const Chat = ({ channelId }) => {
  const { data } = useGetChannelMessages({ channelId });

  const messages = useMemo(() => data?.messages || [], [data]);

  return (
    <div className="flex flex-col items-center">
      {messages.map((message, index) => (
        <Card key={index}>
          <strong>{message.username}</strong> {message.content}
        </Card>
      ))}
    </div>
  );
};
