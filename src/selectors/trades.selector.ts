import { createSelector } from 'reselect';
import { 
  ITradesState,
  IActiveTradeState,
  ITradeDetailsState,
  ITradeChatsState
} from '../interfaces';

export const tradesSelector = createSelector(
  (state: ITradesState) => state.trades,
  tradesList => tradesList
);

export const activeTradeIdSelector = createSelector(
  (state: IActiveTradeState) => state.activeTradeId,
  tradesList => tradesList
);

export const tradeDetailsSelector = createSelector(
  (state: ITradeDetailsState) => state.tradeDetails,
  tradesList => tradesList
);

export const tradeChatsSelector = createSelector(
  (state: ITradeChatsState) => state.tradeChats,
  tradesList => tradesList
);