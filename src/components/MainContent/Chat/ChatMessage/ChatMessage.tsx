import React, { useMemo } from 'react';

import { IUser } from '@interfaces/IUser';

import { Avatar } from '@components/base/Avatar/Avatar';

import './ChatMessage.scss';

interface IChatMessageProps {
  currentUserId: number;
  seller: IUser | undefined;
  buyer: IUser | undefined;
  userId: number | undefined;
  message: string;
  time: string;
}

export const ChatMessage = ({
  currentUserId,
  seller,
  buyer,
  userId,
  message,
  time,
}: IChatMessageProps) => {
  const { id: sellerId, avatar: sellerAvatar } = seller || {};
  const { avatar: buyerAvatar } = buyer || {};
  const messageClass = useMemo(
    () =>
      `chat-message ${
        userId === currentUserId ? 'message-left' : 'message-right'
      }`,
    [userId, currentUserId]
  );
  const formattedTime = useMemo(
    () =>
      new Date(time).toLocaleString('ru-Ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    [time]
  );
  const avatar = useMemo(
    () => `/img/${userId === sellerId ? sellerAvatar : buyerAvatar}`,
    [userId, sellerId, sellerAvatar, buyerAvatar]
  );

  return (
    <div className={messageClass}>
      <div className="chat-message__wrapper">
        <div className="chat-message__avatar">
          <Avatar avatar={avatar} />
        </div>
        <div className="chat-message__body">{message}</div>
      </div>
      <div className="chat-message__time">{formattedTime}</div>
    </div>
  );
};
