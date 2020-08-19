import React from 'react';

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
  const messageClass = `chat-message ${
    userId === currentUserId ? 'message-left' : 'message-right'
  }`;
  const avatar = `/img/${userId === sellerId ? sellerAvatar : buyerAvatar}`;

  return (
    <div className={messageClass}>
      <div className="chat-message__wrapper">
        <div className="chat-message__avatar">
          <Avatar avatar={avatar} />
        </div>
        <div className="chat-message__body">{message}</div>
      </div>
      <div className="chat-message__time">{time}</div>
    </div>
  );
};
