import React from 'react';
import { ITradeProps } from 'interfaces';
import { paymentMethodsMap } from '../../constants';
import { calculateAmountBTC } from 'services';
import './TradeItem.scss';

export const TradeItem: React.FC<ITradeProps> = ({
  id,
  buyer,
  seller,
  paymentMethod,
  amount,
  isPaid,
  hasUnreadMessages,
  currentUserId,
  activeTradeId,
  tradeClick
}) => {
  const paid = isPaid ? 'Paid' : 'Not Paid';
  const isBuyer = buyer.id === currentUserId;
  const avatar = `/img/${isBuyer ? seller.avatar : buyer.avatar}`;
  const cardClass = `trade-item${id === activeTradeId ? ' trade-item--active' : ''}`;
  const paidClass = `trade-item__paid${isPaid ? ' trade-item__paid--active' : ''}`;
  const indicatorClass = `trade-item__messages-indicator${hasUnreadMessages ? ' has-messages' : ''}`;
  const amountValue = `${amount} USD (${calculateAmountBTC(amount)} BTC)`;
  
  const clickHandler = () => tradeClick(id);

  return (
    <div className={cardClass} onClick={clickHandler}>
      <span className={indicatorClass}></span>
      <div className='trade-item__base-info'>
        <div className='trade-item__buyer'>
          { isBuyer ? 
            <span> You are buying from {seller.name}</span> :
            <>
              <span className='trade-item__buyer-name'>{buyer.name}</span> 
              <span> is buying</span>
            </>
          }
        </div>
        <div className='trade-item__payment-method'>{paymentMethodsMap[paymentMethod]}</div>
        <div className='trade-item__amount'>{amountValue}</div>
      </div>
      <div className='trade-item__paid-info'>
        <div className='trade-item__avatar'>
          <img src={avatar} alt='buyer avatar' />
        </div>
        <div className={paidClass}>{paid}</div>
      </div>
    </div>
  );
};

