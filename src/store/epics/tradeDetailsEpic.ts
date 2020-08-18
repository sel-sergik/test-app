import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import {
  getTradeDetailsAction,
  clearTradeDetailsAction
} from '@store/actions/tradesActions';

import * as actions from '@constants/actionTypes';

import { findTradeInfo } from '@services/tradeService';

interface IRequestTradeDetailsAction {
  type: string,
  payload: number
}

export const getTradeDetailsEpic: Epic<IRequestTradeDetailsAction> = 
(action$) =>
  action$.pipe(
    ofType(actions.REQUEST_TRADE_DETAILS),
    delay(1000),
    mergeMap((action) => {
      const tradeDetails = findTradeInfo(action.payload);

      return of(
        tradeDetails
          ? getTradeDetailsAction(tradeDetails)
          : clearTradeDetailsAction()
      );
    })
  );
