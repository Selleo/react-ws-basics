import React, { useCallback, useState } from 'react';

import { Button, Input } from '../../components';

export const ChatForm = ({ onSubmit, onMessageChange }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      onSubmit?.({ message });
      setMessage('');
    },
    [message, onSubmit]
  );

  const handleMessageChange = useCallback(
    (value) => {
      setMessage(value);
      onMessageChange?.();
    },
    [onMessageChange]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input value={message} onChange={handleMessageChange} />
      </div>
      <div>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};
