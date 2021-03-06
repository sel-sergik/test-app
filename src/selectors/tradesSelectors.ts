import { createSelector } from 'reselect';

import { isSeller } from '@services/usersService';

import { ITrade } from '@interfaces/ITrade';
import { ITradeDetails } from '@interfaces/ITradeDetails';
import { IChat } from '@interfaces/IChat';

interface ITradesState {
  trades: ITrade[];
}

interface IActiveTradeState {
  activeTradeId: number;
}

interface ITradeDetailsState {
  tradeDetails: ITradeDetails;
}

interface ITradeChatsState {
  tradeChats: IChat[];
}

export const tradesSelector = 
  (state: ITradesState) => state.trades;

export const activeTradeIdSelector = 
  (state: IActiveTradeState) => state.activeTradeId;

export const tradeDetailsSelector = 
  (state: ITradeDetailsState) => state.tradeDetails;

export const tradeChatsSelector = 
  (state: ITradeChatsState) => state.tradeChats;

export const tradeIsPaidSelector = (tradeId: number) =>
  createSelector(
    tradesSelector,
    (tradesList) => tradesList?.find((trade) => trade.id === tradeId)?.isPaid
  );

export const tradesByUserSelector = (currentUserId: number) =>
  createSelector(tradesSelector, (tradesList) =>
    isSeller(currentUserId)
      ? tradesList.filter((trade) => trade.seller.id === currentUserId)
      : tradesList.filter((trade) => trade.buyer.id === currentUserId)
  );

export const chatReadMessagesSelector = (
  tradeId: number,
  currentUserId: number
) => {
  return createSelector(
    (state: ITradeChatsState) => state.tradeChats,
    (chats) =>
      chats
        .find((chat) => chat.tradeId === tradeId)
        ?.messages.filter(
          (message) => message.isRead || message.userId === currentUserId
        )
  );
};

export const chatUnreadMessagesSelector = (
  tradeId: number,
  currentUserId: number
) => {
  return createSelector(
    (state: ITradeChatsState) => state.tradeChats,
    (chats) =>
      chats
        .find((chat) => chat.tradeId === tradeId)
        ?.messages.filter(
          (message) => !message.isRead && message.userId !== currentUserId
        )
  );
};

export const relatedTradeSelector = (tradeId: number) => {
  return createSelector(
    (state: ITradesState) => state.trades,
    (trades) => trades?.find((trade) => trade.id === tradeId)
  );
};

export const interlocutorNameSelector = (
  currentUserId: number,
  tradeId: number
) => {
  return createSelector(relatedTradeSelector(tradeId), (trade) =>
    isSeller(currentUserId) ? trade?.buyer.name : trade?.seller.name
  );
};
