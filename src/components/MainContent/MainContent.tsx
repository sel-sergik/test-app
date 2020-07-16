import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ITradeDetails } from '@interfaces/ITradeDetails';
import { IUser } from '@interfaces/IUser';

import { currentUserSelector } from '@selectors/usersSelectors';
import { tradeDetailsSelector } from '@selectors/tradesSelectors';

import { TradesList } from '@components/MainContent/TradesList/TradesList';
import { TradeDetails } from '@components/MainContent/TradeDetails/TradeDetails';
import { MemoizedChat } from '@components/MainContent/Chat/Chat';

import { setActiveTradeAction } from '@store/actions/tradesActions';
import { setCurrentUserAction } from '@store/actions/loginActions';
import { setBTCRateAction } from '@store/actions/btcAction';

import { isObjectEmpty } from '@services/sharedService';
import { getCurrentUserFromStorage } from '@services/storageService';

import { useTimeout } from '@hooks/useInterval';

import './MainContent.scss';

interface IMatch {
  [key: string]: string;
}

interface IMainContentProps {
  match?: IMatch;
}

export const MainContent: React.FC<IMainContentProps> = ({ match }) => {
  const dispatch = useDispatch();
  const currentUser: IUser = useSelector(currentUserSelector);
  const tradeDetails: ITradeDetails = useSelector(tradeDetailsSelector);
  const currentUserFromLocalStorage = getCurrentUserFromStorage();
  const tradeDetailsExist = 
    useMemo(() => !isObjectEmpty(tradeDetails), [tradeDetails]);

  useEffect(() => {
    const tradeId = Number(match?.tradeID);

    !isNaN(tradeId) && dispatch(setActiveTradeAction(tradeId));
  }, [match]);

  useEffect(() => {
    !currentUser && currentUserFromLocalStorage &&
      dispatch(setCurrentUserAction(JSON.parse(currentUserFromLocalStorage)));
  }, [currentUser, currentUserFromLocalStorage]);
  
  useTimeout(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
      .then(res => res.json())
      .then(res => {
        dispatch(setBTCRateAction(res.bpi.USD.rate_float));
      });
  }, 0);

  return (
    <main>
      {currentUser ? (
        <>
          <TradesList />
          <MemoizedChat currentUserId={currentUser.id} />
          {tradeDetailsExist && (
            <TradeDetails currentUserId={currentUser.id} {...tradeDetails} />
          )}
        </>
      ) : (
        <p className="unauthorized-notification">
          Login please before start working with application
        </p>
      )}
    </main>
  );
};
