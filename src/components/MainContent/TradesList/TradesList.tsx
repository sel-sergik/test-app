import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  requestTradesAction,
  requestTradeDetailsAction,
} from '@store/actions/tradesActions';

import {
  activeTradeIdSelector,
  tradesByUserSelector,
} from '@selectors/tradesSelectors';
import { currentUserSelector } from '@selectors/usersSelectors';
import { btcRateSelector } from '@selectors/btcSelectors';

import { ITrade } from '@interfaces/ITrade';

import { TradeItem } from '@components/MainContent/TradesList/TradeItem/TradeItem';

import './TradesList.scss';

export const TradesList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { id: currentUserId } = useSelector(currentUserSelector);
  const activeTradeId = useSelector(activeTradeIdSelector);
  const yourTrades: Array<ITrade> = useSelector(
    tradesByUserSelector(currentUserId)
  );
  const btcRate = useSelector(btcRateSelector);
  const iconPath = open ? '/img/close-icon.png' : '/img/menu-icon.png';

  useEffect(() => {
    dispatch(requestTradesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(requestTradeDetailsAction(activeTradeId));
  }, [activeTradeId, dispatch]);

  const tradeCkickHandler = useCallback(
    (tradeId: number) => {
      history.push(`/trade/${tradeId}`);
    },
    [history]
  );

  const menuClickHandler = () => setOpen(!open);

  return (
    <>
      <span
        className="trades-menu"
        onClick={menuClickHandler}
        onKeyDown={menuClickHandler}
        role="button"
        tabIndex={0}
      >
        <img
          className="trades-menu__icon"
          src={iconPath}
          alt="trades menu icon"
        />
      </span>
      <div className={`trades-list${!open ? ' trades-list--disabled' : ''}`}>
        {yourTrades.map((trade) => (
          <TradeItem
            key={trade.id}
            {...trade}
            currentUserId={currentUserId}
            activeTradeId={activeTradeId}
            btcRate={btcRate}
            tradeClick={tradeCkickHandler}
          />
        ))}
      </div>
    </>
  );
};
