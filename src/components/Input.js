import React, { useCallback, useState } from 'react';

export const Input = ({ name, label, defaultValue, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleOnChange = useCallback(
    ({ target: { value } }) => {
      setInputValue(value);

      onChange?.(value);
    },
    [onChange]
  );

  return (
    <div className="my-2 w-full">
      {!!label && <label htmlFor="username-input">Username</label>}

      <input
        id={`${name}-input`}
        name={name}
        value={inputValue}
        onChange={handleOnChange}
        className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-full"
        {...props}
      />
    </div>
  );
};
