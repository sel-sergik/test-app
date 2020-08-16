import { combineEpics } from 'redux-observable';
import { fetchTradesEpic } from '@store/epics/tradesEpic';
import { getTradeDetailsEpic } from '@store/epics/tradeDetailsEpic';

export const rootEpic = combineEpics(fetchTradesEpic, getTradeDetailsEpic);
