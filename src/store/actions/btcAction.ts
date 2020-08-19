import { createAction } from 'redux-actions';

import * as actions from '@constants/actionTypes';

export const requestPriceAction = createAction(actions.REQUEST_PRICE);
export const setBTCRateAction = createAction(actions.SET_BTC_RATE);
