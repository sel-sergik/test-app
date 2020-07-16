import { handleActions } from 'redux-actions';

import { setBTCRateAction } from '@store/actions/btcAction';

export const btcRateReducer = handleActions(
  {
    [`${setBTCRateAction}`]: (state, { payload }) => payload,
  },
  1
);
