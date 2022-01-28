import React, { useCallback, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { Button, Card, Input } from '../components';

export const SignIn = () => {
  const [usernameKey, setUsernameKey, removeUsernameKey] =
    useLocalStorage('username');
  const [username, setUsername] = useState('');

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setUsernameKey(username);
      setUsername('');
    },
    [setUsernameKey, username]
  );

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full">
        <Card>
          {!!usernameKey ? (
            <div>
              <div>current user: {usernameKey}</div>
              <div>
                <Button onClick={removeUsernameKey}>Log out</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOnSubmit}>
              <div>
                <Input
                  name="username"
                  label="Username"
                  defaultValue={username}
                  onChange={setUsername}
                  type="text"
                  required
                />
              </div>
              <div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
