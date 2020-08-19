import { combineEpics } from 'redux-observable';
import { fetchTradesEpic } from '@store/epics/tradesEpic';
import { getTradeDetailsEpic } from '@store/epics/tradeDetailsEpic';
import { priceEpic } from '@store/epics/priceEpic';

export const rootEpic = 
  combineEpics(fetchTradesEpic, getTradeDetailsEpic, priceEpic);
