import { handleActions } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const btcRateReducer = handleActions(
  {
    [actions.SET_BTC_RATE]: (state, { payload }) => payload,
  },
  1
);
