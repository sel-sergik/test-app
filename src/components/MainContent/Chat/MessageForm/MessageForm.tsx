import React, { useState, useCallback, SyntheticEvent, ChangeEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

import { addMessageAction } from '@store/actions/tradesActions';

import { formatedTime } from '@services/sharedService';

import './MessageForm.scss';

interface IMessageFormProps {
  tradeId: number;
  currentUserId: number;
}

export const MessageForm = ({
  tradeId,
  currentUserId,
}: IMessageFormProps) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const validateForm = useCallback(() => message.length > 0, [message]);

  const formIsInvalid = useMemo(() => !validateForm(), [validateForm]);

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(addMessageAction({
      tradeId,
      userId: currentUserId,
      message,
      time: formatedTime(),
      isRead: false,
    }));
    setMessage('');
  }, [tradeId, currentUserId, message]);

  const onChangeHandler = 
    (event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value);

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="message">
          <FormControl
            autoFocus
            type="text"
            value={message}
            placeholder="Type your message..."
            onChange={onChangeHandler}
          />
        </FormGroup>
        <Button block disabled={formIsInvalid} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
