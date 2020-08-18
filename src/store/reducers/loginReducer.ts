import { handleActions } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const loginReducer = handleActions(
  {
    [actions.SET_CURRENT_USER]: (state, { payload }) => payload,
  },
  null
);
