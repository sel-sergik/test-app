import { tradesDetails, trades } from '../constants';

export const findTradeInfo = (tradeId: number) =>  tradesDetails.find(tradeDetails => tradeDetails.tradeId === tradeId);
export const findTradebyId = (tradeId: number) =>  trades.find(trade => trade.id === tradeId);