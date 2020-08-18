import { handleActions } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const activeTradeReducer = handleActions(
  {
    [actions.SET_ACTIVE_TRADE]: (state, { payload }) => payload,
  },
  null
);
