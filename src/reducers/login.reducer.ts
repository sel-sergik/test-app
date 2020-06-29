import { handleActions } from 'redux-actions';
import { setCurrentUserAction } from '../actions';

export const loginReducer = handleActions(
  {
    [`${setCurrentUserAction}`]: (state, { payload }) => {
      return payload;
    }
  },
  null
);