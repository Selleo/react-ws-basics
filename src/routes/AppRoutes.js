import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLayout } from '../components/layouts';
import { PostPreview, Posts, SignIn } from '../views';
import paths from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={paths.root} element={<PageLayout />}>
      <Route index element={<SignIn />} />
      <Route path={paths.posts} element={<Posts />} />
      <Route path={paths.post()} element={<PostPreview />} />
    </Route>
  </Routes>
);

export default AppRoutes;
