import React from 'react';

export const Card = ({ children, title, image, content, ...props }) => (
  <div
    className="my-6 rounded shadow-lg overflow-hidden max-w-md w-full"
    {...props}
  >
    {!!children ? (
      <div className="px-6 py-4 ">{children}</div>
    ) : (
      <>
        {!!image && <img className="w-full" src={image} alt={title} />}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base text-gray-700">{content}</p>
        </div>
      </>
    )}
  </div>
);
