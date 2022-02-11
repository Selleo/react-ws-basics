import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import { Chat } from './Chat';

export const ChannelPreview = () => {
  const { channelId } = useParams();
  const [usernameKey] = useLocalStorage('username');

  return (
    <div className="py-4 h-full">
      {!!usernameKey && <Chat channelId={channelId} />}
    </div>
  );
};
