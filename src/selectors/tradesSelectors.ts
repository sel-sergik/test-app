import { createSelector } from 'reselect';

import { isSeller } from '@services/usersService';
import { ITrade } from '@interfaces/ITrade';
import { ITradeDetails } from '@interfaces/ITradeDetails';
import { IChat } from '@interfaces/IChat';

interface ITradesState {
  trades: Array<ITrade>;
}

interface IActiveTradeState {
  activeTradeId: number;
}

interface ITradeDetailsState {
  tradeDetails: ITradeDetails;
}

interface ITradeChatsState {
  tradeChats: Array<IChat>;
}

export const tradesSelector = createSelector(
  (state: ITradesState) => state.trades,
  (tradesList) => tradesList
);

export const activeTradeIdSelector = createSelector(
  (state: IActiveTradeState) => state.activeTradeId,
  (tradesList) => tradesList
);

export const tradeDetailsSelector = createSelector(
  (state: ITradeDetailsState) => state.tradeDetails,
  (tradesList) => tradesList
);

export const tradeChatsSelector = createSelector(
  (state: ITradeChatsState) => state.tradeChats,
  (tradesList) => tradesList
);

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
