import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IUser } from '@interfaces/IUser';
import { PaymentMethods } from '@constants/PaymentMethods';

import { calculateAmountBTC } from '@services/calculateAmountBTC';

import { PAYMENT_METHODS_NAMES } from '@constants/paymentMethodsNames';

import { chatUnreadMessagesSelector } from '@selectors/tradesSelectors';

import { Avatar } from '@components/base/Avatar/Avatar';

import './TradeItem.scss';

interface ITradeProps {
  id: number;
  buyer: IUser;
  seller: IUser;
  paymentMethod: PaymentMethods;
  amount: number;
  isPaid: boolean;
  currentUserId: number;
  activeTradeId: number;
  btcRate: number;
  tradeClick: (tradeId: number) => void;
}

export const TradeItem = ({
  id,
  buyer,
  seller,
  paymentMethod,
  amount,
  isPaid,
  currentUserId,
  activeTradeId,
  btcRate,
  tradeClick,
}: ITradeProps) => {
  const unReadMessages = useSelector(
    chatUnreadMessagesSelector(id, currentUserId)
  );
  const hasUnReadMessages = unReadMessages?.length;
  const paid = useMemo(() => (isPaid ? 'Paid' : 'Not Paid'), [isPaid]);
  const isBuyer = useMemo(() => buyer.id === currentUserId, [
    buyer,
    currentUserId,
  ]);
  const avatar = useMemo(
    () => `/img/${isBuyer ? seller.avatar : buyer.avatar}`,
    [isBuyer, seller, buyer]
  );
  const cardClass = useMemo(
    () => `trade-item${id === activeTradeId ? ' trade-item--active' : ''}`,
    [id, activeTradeId]
  );
  const paidClass = useMemo(
    () => `trade-item__paid${isPaid ? ' trade-item__paid--active' : ''}`,
    [isPaid]
  );
  const indicatorClass = useMemo(
    () =>
      `trade-item__messages-indicator${
        hasUnReadMessages ? ' has-messages' : ''
      }`,
    [hasUnReadMessages]
  );
  const amountValue = useMemo(
    () => `${amount} USD (${calculateAmountBTC(amount, btcRate)} BTC)`,
    [amount, btcRate]
  );

  const clickHandler = useCallback(() => tradeClick(id), [id, tradeClick]);

  return (
    <div
      className={cardClass}
      onClick={clickHandler}
      onKeyDown={clickHandler}
      role="button"
      tabIndex={0}
    >
      <span className={indicatorClass} />
      <div className="trade-item__base-info">
        <div className="trade-item__buyer">
          {isBuyer ? (
            <span> You are buying from {seller.name}</span>
          ) : (
            <>
              <span className="trade-item__buyer-name">{buyer.name}</span>
              <span> is buying</span>
            </>
          )}
        </div>
        <div className="trade-item__payment-method">
          {PAYMENT_METHODS_NAMES[paymentMethod]}
        </div>
        <div className="trade-item__amount">{amountValue}</div>
      </div>
      <div className="trade-item__paid-info">
        <Avatar avatar={avatar} />
        <div className={paidClass}>{paid}</div>
      </div>
    </div>
  );
};
