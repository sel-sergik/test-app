import { handleActions } from 'redux-actions';

import { ITrade } from '@interfaces/ITrade';

import * as actions from '@constants/actionTypes';

const tradesInitialState: Array<ITrade> = [];

export const tradesReducer = handleActions(
  {
    [actions.GET_TRADES]: (state, { payload }) => payload,
    [actions.UPDATE_TRADES]: (state, { payload }) => {
      const tradeId = (payload as unknown) as number;
      return state.reduce((newState: Array<ITrade>, trade: ITrade) => {
        newState.push(
          trade.id === tradeId ? { ...trade, isPaid: true } : trade
        );
        return newState;
      }, []);
    },
    [actions.REMOVE_TRADE]: (state, { payload }) =>
      state.filter((trade) => trade.id !== ((payload as unknown) as number)),
  },
  tradesInitialState
);
