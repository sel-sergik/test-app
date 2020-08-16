import { TRADES_DETAILS, TRADES } from '@mocks/mocks';

export const findTradeInfo = (tradeId: number) =>
  TRADES_DETAILS.find((tradeDetails) => tradeDetails.tradeId === tradeId);
  
export const findTradebyId = (tradeId: number) =>
  TRADES.find((trade) => trade.id === tradeId);
