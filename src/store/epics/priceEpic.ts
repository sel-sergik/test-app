import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  setBTCRateAction
} from '@store/actions/btcAction';

import * as actions from '@constants/actionTypes';

interface IRequestPriceAction {
  type: string;
}

interface IPriceResponse {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    USD: {
      code: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}

export const priceEpic =
(action$: Observable<IRequestPriceAction>) =>
  action$.pipe(
    ofType(actions.REQUEST_PRICE),
    switchMap(() => 
      ajax({
        url: 'https://api.coindesk.com/v1/bpi/currentprice/USD.json',
        method: 'GET'
      })
        .pipe(map((responseData: AjaxResponse) => responseData.response))
        .pipe(map((priceData: IPriceResponse) => 
          setBTCRateAction(priceData.bpi.USD.rate_float)))
    ),
    catchError((err) => {
      return of({ error: true, message: `Error: ${err}` });
    })
  );
