import { createAction } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const setCurrentUserAction = createAction(actions.SET_CURRENT_USER);
