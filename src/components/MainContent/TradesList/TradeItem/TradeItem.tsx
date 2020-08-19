import React, { useMemo } from 'react';
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

export const TradeItem = React.memo(({
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
  const paid = isPaid ? 'Paid' : 'Not Paid';
  const isBuyer = buyer.id === currentUserId;
  const avatar = `/img/${isBuyer ? seller.avatar : buyer.avatar}`;
  const cardClass = `trade-item${id === activeTradeId ? ' trade-item--active' : ''}`;
  const paidClass = `trade-item__paid${isPaid ? ' trade-item__paid--active' : ''}`;
  const indicatorClass = `trade-item__messages-indicator${
    hasUnReadMessages ? ' has-messages' : ''
  }`;
  const amountValue = useMemo(
    () => `${amount} USD (${calculateAmountBTC(amount, btcRate)} BTC)`,
    [amount, btcRate]
  );

  const clickHandler = () => tradeClick(id);

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
});
