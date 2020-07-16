import { handleActions } from 'redux-actions';
import { getTradeDetailsAction, clearTradeDetailsAction } from '@store/actions/tradesActions';

export const tradeDetailsReducer = handleActions(
  {
    [`${getTradeDetailsAction}`]: (state, { payload }) => payload,
    [`${clearTradeDetailsAction}`]: (state, { payload }) => {
      return {};
    },
  },
  {}
);