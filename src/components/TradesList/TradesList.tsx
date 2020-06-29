import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getTrades, getTradeDetails } from 'actions';
import { tradesSelector, currentUserSelector, activeTradeIdSelector } from 'selectors';
import { ITrade, IUser } from 'interfaces';
import { TradeItem } from 'components';
import { isSeller } from 'services';
import './TradesList.scss';

export const TradesList: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser: IUser = useSelector(currentUserSelector);
  const trades: Array<ITrade> = useSelector(tradesSelector);
  const activeTradeId = useSelector(activeTradeIdSelector);
  const currentUserId = currentUser.id;
  const isCurrentUserSeller = isSeller(currentUserId);
  const yourTrades = isCurrentUserSeller ? 
    trades.filter(trade => trade.seller.id === currentUserId) :
    trades.filter(trade => trade.buyer.id === currentUserId);

  useEffect(() => {
    dispatch(getTrades());
  }, []);

  useEffect(() => {
    dispatch(getTradeDetails(activeTradeId));
  }, [activeTradeId]);

  const tradeCkickHandler = (tradeId: number) => {
    history.push(`/trade/${tradeId}`);
  }

  return (
    <div className='trades-list'>
      { yourTrades.map(trade => (<TradeItem key={trade.id} {...trade} currentUserId={currentUserId} activeTradeId={activeTradeId} tradeClick={tradeCkickHandler} />))}
    </div>
  );
};
