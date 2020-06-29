import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from 'react-redux';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { addMessageAction } from 'actions';
import { IMessageFormProps } from "interfaces";
import './MessageForm.scss';
import { formatTime } from "services";

export const MessageForm: React.FC<IMessageFormProps> = ({
  tradeId,
  currentUserId
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const validateForm = () => {
    return message.length > 0;
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);

    const newMessage = {
      tradeId: tradeId,
      userId: currentUserId,
      message: message,
      time: formattedTime,
      isRead: false
    };

    dispatch(addMessageAction(newMessage));
    setMessage('');
  }

  return (
    <div className='message-form'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='message'>
          <FormControl
            autoFocus
            type='text'
            value={message}
            placeholder='Type your message...'
            onChange={e => setMessage(e.target.value)}
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type='submit'>
          Send
        </Button>
      </form>
    </div>
  );
};
