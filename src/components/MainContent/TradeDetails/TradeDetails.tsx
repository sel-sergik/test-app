import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTradesAction } from '@store/actions/tradesActions';

import { findUserById } from '@services/usersService';

import { tradeIsPaidSelector } from '@selectors/tradesSelectors';

import { TradeBaseInfo } from '@components/MainContent/TradeDetails/TradeBaseInfo/TradeBaseInfo';
import { TradeAdvancedInfo } from '@components/MainContent/TradeDetails/TradeAdvancedInfo/TradeAdvancedInfo';

import './TradeDetails.scss';

interface ITradeDetailsProps {
  currentUserId: number;
  tradeId: number;
  buyerId: number;
  buyerPosReputation: number;
  buyerNegReputation: number;
  buyerNumberOfTrades: number;
  tradeHash: string;
  amount: number;
}

export const TradeDetails = ({
  currentUserId,
  tradeId,
  buyerId,
  buyerPosReputation,
  buyerNegReputation,
  buyerNumberOfTrades,
  tradeHash,
  amount,
}: ITradeDetailsProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isBuyer = currentUserId === buyerId;
  const buyer = findUserById(buyerId);
  const tradeIsPaid = useSelector(tradeIsPaidSelector(tradeId));
  const iconPath = open ? '/img/close-icon.png' : '/img/details-icon.png';

  const buttonClickHandler = useCallback(() =>
    dispatch(updateTradesAction(tradeId))
  , [tradeId]);

  const detailsClickHandler = () => setOpen(!open);

  return (
    <>
      {!isBuyer ? (
        <>
          <span 
            className='details-menu'
            onClick={detailsClickHandler}
            onKeyDown={detailsClickHandler}
            role='button'
            tabIndex={0}
          >
            <img className='details-menu__icon' src={iconPath} alt='details menu icon' />
          </span>
          <div className={`trade-details${!open ? ' trade-details--disabled' : ''}`}>
            <TradeBaseInfo
              name={buyer?.name as string}
              buttonClick={buttonClickHandler}
              tradeIsPaid={tradeIsPaid as boolean}
            />
            <TradeAdvancedInfo
              avatar={`/img/${buyer?.avatar}`}
              buyerPosReputation={buyerPosReputation}
              buyerNegReputation={buyerNegReputation}
              buyerNumberOfTrades={buyerNumberOfTrades}
              tradeIsPaid={tradeIsPaid as boolean}
              tradeHash={tradeHash}
              amount={amount}
            />
          </div>
        </>
      ) : null}
    </>
  );
};
