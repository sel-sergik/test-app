import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { getTradesAction } from '@store/actions/tradesActions';

import * as actions from '@constants/actionTypes';

import { TRADES } from '@mocks/mocks';

interface IRequestTradesAction {
  type: string
}

export const fetchTradesEpic: Epic<IRequestTradesAction> = (action$) =>
  action$.pipe(
    ofType(actions.REQUEST_TRADES),
    delay(1000),
    switchMap(() => of(getTradesAction(TRADES)))
  );
