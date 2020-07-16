import { handleActions } from 'redux-actions';

import { ITrade } from '@interfaces/ITrade';

import {
  getTradesAction,
  updateTradesAction,
  removeTradeAction
} from '@store/actions/tradesActions';

const tradesInitialState: Array<ITrade> = [];

export const tradesReducer = handleActions(
  {
    [`${getTradesAction}`]: (state, { payload }) => payload,
    [`${updateTradesAction}`]: (state, { payload }) => {
      const tradeId = payload as unknown as number;
      return state.reduce((newState: Array<ITrade>, trade: ITrade) => {
        newState.push(trade.id === tradeId ?
          { ...trade, isPaid: true } : trade);
        return newState;
      }, []);
    },
    [`${removeTradeAction}`]: (state, { payload }) =>
      state.filter((trade) => trade.id !== payload as unknown as number),
  },
  tradesInitialState
);
