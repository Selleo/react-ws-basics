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
];

export const PageLayout = () => {
  return (
    <>
      <Navbar links={navbarLinks} />
      <main className="flex-auto pt-16">
        <Outlet />
      </main>
    </>
  );
};
