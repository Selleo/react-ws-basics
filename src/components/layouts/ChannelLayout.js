import { last } from 'lodash';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useGetChannels } from '../../api/chennels';
import paths from '../../routes/paths';

export const ChannelLayout = () => {
  const { data } = useGetChannels();
  const { pathname } = useLocation();

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      {!!data && (
        <div className="flex justify-center py-4">
          {data.channels.map((channel, index) => (
            <Link key={index} to={paths.channel(channel.id)}>
              <span
                className={`border-4 rounded-md px-4 py-2 mx-4 ${
                  channel.id === Number(last(pathname.split('/')))
                    ? 'border-gray-700'
                    : ''
                }`}
              >
                {channel.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
};
