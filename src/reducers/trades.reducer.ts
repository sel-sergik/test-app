import { handleActions } from 'redux-actions';
import { 
  getTradesAction,
  setActiveTradeAction,
  getTradeDetailsAction,
  clearTradeDetailsAction,
  updateTradesAction,
  removeTradeAction,
  addMessageAction
} from '../actions';
import { tradeChats } from '../constants';
import { ITrade, IChat } from 'interfaces';

const tradesInitialState : Array<ITrade> = [];
const tradeChatsInitialState: Array<IChat> = tradeChats;

interface INewMessageAction {
  type: string;
  payload: {
    tradeId: number;
    userId: number;
    message: string;
    time: string;
    isRead: boolean;
  }
};

export const tradesReducer = handleActions(
  {
    [`${getTradesAction}`]: (state, { payload }) => {
      return payload;
    },
    [`${updateTradesAction}`]: (state, { payload }) => {
      return payload;
    },
    [`${removeTradeAction}`]: (state, { payload }) => {
      return state.filter(trade => trade.id !== Number(payload));
    }
  },
  tradesInitialState
);

export const activeTradeReducer = handleActions(
  {
    [`${setActiveTradeAction}`]: (state, { payload }) => {
      return payload;
    }
  },
  null
);

export const tradeDetailsReducer = handleActions(
  {
    [`${getTradeDetailsAction}`]: (state, { payload }) => {
      return payload;
    },
    [`${clearTradeDetailsAction}`]: (state, { payload }) => {
      return {};
    }
  },
  {}
);

export const tradeChatsReducer = handleActions(
  {
    [`${addMessageAction}`]: (state: IChat[], action: INewMessageAction) => {
      const {userId, message, time, isRead} = action.payload;

      let currentChat = state.find(chat => chat.tradeId === action.payload.tradeId);
      const newState = state.filter(chat => chat.tradeId !== action.payload.tradeId);

      currentChat?.messages.push({userId, message, time, isRead});

      return [...newState].concat([currentChat as IChat]);
    }
  },
  tradeChatsInitialState
);