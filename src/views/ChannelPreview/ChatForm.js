import React, { useCallback, useState } from 'react';

import { Button, Input } from '../../components';

export const ChatForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      onSubmit?.({ message });
      setMessage('');
    },
    [message, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input value={message} onChange={setMessage} />
      </div>
      <div>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};
