import React from 'react';
import { useParams } from 'react-router-dom';

export const ChannelPreview = () => {
  const { channelId } = useParams();

  return <div>Channel id: {channelId}</div>;
};
