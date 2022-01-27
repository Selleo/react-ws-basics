import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLayout } from '../components/layouts';
import { Channels, Posts } from '../views';
import paths from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.root} element={<PageLayout />}>
      <Route index element={<Channels />} />
      <Route path={paths.posts} element={<Posts />} />
    </Route>
  </Routes>
);

export default AppRoutes;
