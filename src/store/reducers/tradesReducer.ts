import { handleActions } from 'redux-actions';

import { ITrade } from '@interfaces/ITrade';

import * as actions from '@constants/actionTypes';

const tradesInitialState: ITrade[] = [];
type State = ITrade[];
type CombinedPayloads = ITrade[] & number;

export const tradesReducer = handleActions<State, CombinedPayloads>( 
  {
    [actions.GET_TRADES]: (state, { payload }) => payload,
    [actions.UPDATE_TRADES]: (state, { payload }) =>
      state.reduce((newState: ITrade[], trade: ITrade) => {
        newState.push(
          trade.id === payload ? { ...trade, isPaid: true } : trade
        );
        return newState;
      }, []),
    [actions.REMOVE_TRADE]: (state, { payload }) =>
      state.filter((trade) => trade.id !== payload)
  },
  tradesInitialState
);
