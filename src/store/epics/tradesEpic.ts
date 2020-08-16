import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { getTradesAction } from '@store/actions/tradesActions';

import { TRADES } from '@mocks/mocks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTradesEpic: Epic<Action<any>> = (action$) =>
  action$.pipe(
    ofType('REQUEST_TRADES'),
    delay(1000),
    switchMap(() => of(getTradesAction(TRADES)))
  );
