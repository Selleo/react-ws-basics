import React, { useCallback, useState } from 'react';

import { Button, Card, Input } from '../components';

export const SignIn = () => {
  const [username, setUsername] = useState('');

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      console.log(username);
    },
    [username]
  );

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full">
        <Card>
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
        </Card>
      </div>
    </div>
  );
};
