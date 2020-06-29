import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITradeDetailsProps } from 'interfaces';
import { updateTradesAction } from 'actions';
import { findUserById, calculateAmountBTC } from 'services';
import './TradeDetails.scss';
import { tradesSelector } from 'selectors';

export const TradeDetails: React.FC<ITradeDetailsProps> = ( {
  currentUserId,
  tradeId,
  buyerId,
  buyerPosReputation,
  buyerNegReputation,
  buyerNumberOfTrades,
  tradeHash,
  amount
} ) => {
  const dispatch = useDispatch();
  const isBuyer = currentUserId === buyerId;
  const buyer = findUserById(buyerId);
  const tradesList = useSelector(tradesSelector);
  const tradeIsPaid = tradesList?.find((trade => trade.id === tradeId))?.isPaid;

  const findAndPaidTrade = (id: number) => {
    const tradeIndex = tradesList.findIndex(trade => trade.id === id);

    if (tradeIndex > -1) {
      const updatedTradesList = [...tradesList];
      updatedTradesList[tradeIndex] = {...tradesList[tradeIndex], isPaid: true};

      return updatedTradesList;
    }

    return [];
  }

  const buttonClickHandler = () => {
    const updatedList = findAndPaidTrade(tradeId);

    updatedList.length && dispatch(updateTradesAction(updatedList));
  }

  return (
    <>
      {!isBuyer ? 
        <div className='trade-details'>
          <div className='trade-details__trade-with'>
            <span>You are trading with </span>
            <span className='trade-details__buyer-name'>{buyer?.name}</span>
          </div>
          <div className='trade-details__start-time'>
            started 23 minutes ago
          </div>
          <button className='trade-details__paid-button' onClick={buttonClickHandler} disabled={tradeIsPaid}>Release bitcoins</button>
          <div className='trade-details__info'>
            <div className='trade-details__info-row'>
              <div className='trade-details__info-buyer'>
                <div className='trade-details__info-buyer-avatar'>
                  <img src={`/img/${buyer?.avatar}`} alt='buyer avatar'/>
                </div>
                <div className='trade-details__info-buyer-reputation'>
                  <span className='trade-details__info-buyer-pos-reputation'>+{buyerPosReputation}</span>
                  /
                  <span className='trade-details__info-buyer-neg-reputation'>-{buyerNegReputation}</span>
                </div>
              </div>
              <div className='trade-details__num-trades'>
                <div className='trade-details__label'># of trades</div>
                <div className='trade-details__num-trades-value'>{buyerNumberOfTrades}</div>
              </div>
            </div>
            <div className='trade-details__info-row'>
              <div className='trade-details__status'>
                <div className='trade-details__label'>Trade Status</div>
                <div className='trade-details__status-info'>
                  {tradeIsPaid ? <span className='paid'>Paid</span> : <span className='nopaid'>Not Paid</span>}
                </div>
              </div>
              <div className='trade-details__hash'>
                <div className='trade-details__label'>Trade hash</div>
                <div className='trade-details__hash-value'>
                  {tradeHash}
                </div>
              </div>
            </div>
            <div className='trade-details__info-row'>
              <div className='trade-details__amount-usd'>
                <div className='trade-details__label'>Amount USD</div>
                <div className='trade-details__amount-value'>
                  {amount}
                </div>
              </div>
              <div className='trade-details__amount-btc'>
                <div className='trade-details__label'>Amount BTC</div>
                <div className='trade-details__amount-value'>
                  {calculateAmountBTC(amount)}
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
      }
    </>
  );
};
