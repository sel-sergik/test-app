import React, {
  useState,
  useCallback,
  SyntheticEvent,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup, FormControl, FormCheck } from 'react-bootstrap';

import {
  addMessageAction,
  markMessagesAction,
} from '@store/actions/tradesActions';

import { formatedTime } from '@services/sharedService';

import './MessageForm.scss';

interface IMessageFormProps {
  tradeId: number;
  currentUserId: number;
  interlocutorId: number | undefined;
}

export const MessageForm = ({
  tradeId,
  currentUserId,
  interlocutorId,
}: IMessageFormProps) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [activeUserId, setActiveUserId] = 
    useState<number | undefined>(currentUserId);

  useEffect(() => {
    activeUserId === currentUserId &&
      setTimeout(
        () => dispatch(markMessagesAction({ currentUserId, tradeId })),
        3000
      );
  }, [activeUserId, currentUserId, tradeId, dispatch]);

  const validateForm = useCallback(() => message.length > 0, [message]);

  const formIsInvalid = useMemo(() => !validateForm(), [validateForm]);

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      dispatch(
        addMessageAction({
          tradeId,
          userId: activeUserId,
          message,
          time: formatedTime(),
          isRead: false,
        })
      );
      setMessage('');
    },
    [tradeId, activeUserId, message, dispatch]
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const userChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setActiveUserId(
      event.target.checked ? interlocutorId : currentUserId
    );

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="message">
          <FormCheck
            type="switch"
            onChange={userChangeHandler}
            label="Send message as interlocutor"
          />
          <FormControl
            autoFocus
            type="text"
            value={message}
            placeholder="Type your message..."
            onChange={onChangeHandler}
            autoComplete="off"
          />
        </FormGroup>
        <Button block disabled={formIsInvalid} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
