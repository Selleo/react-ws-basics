import React from 'react';

export const Button = ({ children, ...props }) => (
  <button
    className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
    {...props}
  >
    {children}
  </button>
);
