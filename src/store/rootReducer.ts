import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { tradesReducer } from '@store/reducers/tradesReducer';
import { activeTradeReducer } from '@store/reducers/activeTradeReducer';
import { tradeDetailsReducer } from '@store/reducers/tradeDetailsReducer';
import { tradeChatsReducer } from '@store/reducers/tradeChatsReducer';

import { loginReducer } from '@store/reducers/loginReducer';

import { btcRateReducer } from '@store/reducers/btcReducer';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    trades: tradesReducer,
    activeTradeId: activeTradeReducer,
    currentUser: loginReducer,
    tradeDetails: tradeDetailsReducer,
    tradeChats: tradeChatsReducer,
    btcRate: btcRateReducer,
  });
export default createRootReducer;
