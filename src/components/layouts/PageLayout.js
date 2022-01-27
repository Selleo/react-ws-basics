import React from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout = () => (
  <div>
    <div>Layout</div>
    <Outlet />
  </div>
);
