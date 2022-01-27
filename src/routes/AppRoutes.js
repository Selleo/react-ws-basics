import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLayout } from '../components/layouts';
import { Channels } from '../views';
import paths from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.root} element={<PageLayout />}>
      <Route index element={<Channels />} />
    </Route>
  </Routes>
);

export default AppRoutes;
