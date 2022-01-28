import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChannelLayout, PageLayout } from '../components/layouts';
import { ChannelPreview, PostPreview, Posts, SignIn } from '../views';
import paths from './paths';

const BlankPage = () => <div />;

const AppRoutes = () => (
  <Routes>
    <Route path={paths.root} element={<PageLayout />}>
      <Route index element={<SignIn />} />
      <Route path={paths.posts} element={<Posts />} />
      <Route path={paths.post()} element={<PostPreview />} />
      <Route path={paths.channels} element={<ChannelLayout />}>
        <Route index element={<BlankPage />} />
        <Route path={paths.channel()} element={<ChannelPreview />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
