import React from 'react';
import { IChatMessageProps } from 'interfaces';
import './ChatMessage.scss';

export const ChatMessage: React.FC<IChatMessageProps> = ({
  currentUserId,
  avatar,
  userId,
  message,
  time
}) => {
  const messageClass = `chat-message ${userId === currentUserId ? 'message-left' : 'message-right'}`;
  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const dateObject = new Date(time);
  const formattedTime = dateObject.toLocaleString('ru-RU', formatOptions);

  return (
    <div className={messageClass}>
      <div className='chat-message__wrapper'>
        <div className='chat-message__avatar'>
          <img src={`/img/${avatar}`} alt='user avatar' />
        </div>
        <div className='chat-message__body'>{message}</div>
      </div>
      <div className='chat-message__time'>{formattedTime}</div>
    </div>
  );
};
