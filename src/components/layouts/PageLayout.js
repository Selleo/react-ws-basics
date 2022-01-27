import React from 'react';
import { Outlet } from 'react-router-dom';

import paths from '../../routes/paths';
import { Navbar } from '../Navbar';

const navbarLinks = [
  {
    name: 'Channels',
    path: paths.root,
  },
  {
    name: 'Posts',
    path: paths.posts,
  },
];

export const PageLayout = () => {
  return (
    <div>
      <Navbar links={navbarLinks} />
      <Outlet />
    </div>
  );
};
