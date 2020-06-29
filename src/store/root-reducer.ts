import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { 
  tradesReducer,
  activeTradeReducer,
  loginReducer,
  tradeDetailsReducer,
  tradeChatsReducer
} from '../reducers';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    trades: tradesReducer,
    activeTradeId: activeTradeReducer,
    currentUser: loginReducer,
    tradeDetails: tradeDetailsReducer,
    tradeChats: tradeChatsReducer
  });
export default createRootReducer;
