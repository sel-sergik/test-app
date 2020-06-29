import React from 'react';
import { IChatHeaderProps } from 'interfaces';
import './ChatHeader.scss';

export const ChatHeader: React.FC<IChatHeaderProps> = ({
  paymentMethod,
  interlocutorName,
  removeTradeHandler
}) => {
  return (
    <div className='chat-header'>
      <button className='chat-header__remove-trade-button' onClick={removeTradeHandler}>
        <img src='/img/remove-icon.png' alt='remove trade icon' />
      </button>
      <div className='chat-header__info'>
        <div className='chat-header__payment-method'>{paymentMethod}</div>
        <div className='chat-header__interlocutor-name'>{interlocutorName}</div>
      </div>
    </div>  
  );
};
