import { handleActions } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const tradeDetailsReducer = handleActions(
  {
    [actions.GET_TRADE_DETAILS]: (state, { payload }) => payload,
    [actions.CLEAR_TRADE_DETAILS]: (state, { payload }) => {
      return {};
    },
  },
  {}
);
