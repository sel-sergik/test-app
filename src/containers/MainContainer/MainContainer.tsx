import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IMainContainerProps, ITradeDetails } from 'interfaces';
import { currentUserSelector, tradeDetailsSelector } from 'selectors';
import { TradesList, TradeDetails, Chat } from 'components';
import { setActiveTradeAction, setCurrentUserAction } from 'actions';
import { IUser } from 'interfaces';
import { isEmpty } from 'services';
import './MainContainer.scss';

export const MainContainer: React.FC<IMainContainerProps> = ({ match }) => {
  const dispatch = useDispatch();
  const currentUser: IUser = useSelector(currentUserSelector);
  const tradeDetails: ITradeDetails = useSelector(tradeDetailsSelector);
  const currentUserFromLocalStorage = localStorage.getItem('currentUser');

  useEffect(() => {
    const tradeId = Number(match?.tradeID);

    !isNaN(tradeId) && dispatch(setActiveTradeAction(tradeId));
  }, [match]);

  useEffect(() => {
    if (!currentUser) {
      currentUserFromLocalStorage && dispatch(setCurrentUserAction(JSON.parse(currentUserFromLocalStorage)));
    }
  }, [currentUser]);

  return (
    <main>
      { currentUser ? 
        <>
          <TradesList />
          <Chat currentUserId={currentUser.id} />
          {!isEmpty(tradeDetails) && <TradeDetails currentUserId={currentUser.id} {...tradeDetails}/>}
        </> :
        <p className='unauthorized-notification'>Login please before start working with application</p>
      }
    </main>
  );
};
