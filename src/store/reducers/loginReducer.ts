import { handleActions } from 'redux-actions';

import { setCurrentUserAction } from '@store/actions/loginActions';

export const loginReducer = handleActions(
  {
    [`${setCurrentUserAction}`]: (state, { payload }) => payload,
  },
  null
);
