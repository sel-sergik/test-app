import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import {
  getTradeDetailsAction,
  clearTradeDetailsAction,
} from '@store/actions/tradesActions';

import { findTradeInfo } from '@services/tradeService';

import { IActionWithPayload } from '@interfaces/IActionWithPayload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTradeDetailsEpic: Epic<IActionWithPayload<any>> = (action$) =>
  action$.pipe(
    ofType('REQUEST_TRADE_DETAILS'),
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
