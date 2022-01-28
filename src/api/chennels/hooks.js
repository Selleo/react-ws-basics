import { useQuery } from 'react-query';

import { handleSelectors } from '../shared';
import { fetchChannelMessages, fetchChannels } from './requests';
import { getChannelMessages, getChannels } from './selectors';

export const useGetChannels = ({
  selectors = { channels: getChannels },
  ...options
} = {}) =>
  useQuery('channels', fetchChannels, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetChannelMessages = ({
  channelId,
  selectors = { messages: getChannelMessages },
  ...options
} = {}) =>
  useQuery(['channelMessages', { channelId }], fetchChannelMessages, {
    select: handleSelectors(selectors),
    ...options,
  });
