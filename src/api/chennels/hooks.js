import { useQuery } from 'react-query';

import { handleSelectors } from '../shared';
import { fetchChannels } from './requests';
import { getChannels } from './selectors';

export const useGetChannels = ({
  selectors = { channels: getChannels },
  ...options
} = {}) =>
  useQuery('channels', fetchChannels, {
    select: handleSelectors(selectors),
    ...options,
  });
