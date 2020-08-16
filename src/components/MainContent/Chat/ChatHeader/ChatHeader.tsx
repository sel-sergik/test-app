import React from 'react';

import { PaymentMethods } from '@interfaces/PaymentMethods';

import { PAYMENT_METHODS_NAMES } from '@constants/paymentMethodsNames';

import './ChatHeader.scss';

interface IChatHeaderProps {
  paymentMethod: PaymentMethods;
  interlocutorName: string;
  removeTradeHandler: () => void;
}

export const ChatHeader = ({
  paymentMethod,
  interlocutorName,
  removeTradeHandler,
}: IChatHeaderProps) => (
  <div className="chat-header">
    <button
      type="button"
      className="chat-header__remove-trade-button"
      onClick={removeTradeHandler}
    >
      <img
        src="/img/remove-icon.png"
        className="chat-header__remove-icon"
        alt="remove trade icon"
      />
    </button>
    <div className="chat-header__info">
      <p className="chat-header__payment-method">
        {PAYMENT_METHODS_NAMES[paymentMethod]}
      </p>
      <p className="chat-header__interlocutor-name">{interlocutorName}</p>
    </div>
  </div>
);
