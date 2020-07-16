import { handleActions } from 'redux-actions';

import { setActiveTradeAction } from '@store/actions/tradesActions';

export const activeTradeReducer = handleActions(
  {
    [`${setActiveTradeAction}`]: (state, { payload }) => payload,
  },
  null
);