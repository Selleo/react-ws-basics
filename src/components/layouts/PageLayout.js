import React from 'react';
import { Outlet } from 'react-router-dom';

import paths from '../../routes/paths';
import { Navbar } from '../Navbar';

const navbarLinks = [
  {
    name: 'SignIn',
    path: paths.root,
  },
  {
    name: 'Posts',
    path: paths.posts,
  },
  {
    name: 'Channels',
    path: paths.channels,
  },
];

export const PageLayout = () => {
  return (
    <div className="h-screen">
      <Navbar links={navbarLinks} />
      <main className="flex-auto h-full pt-16">
        <Outlet />
      </main>
    </div>
  );
};
