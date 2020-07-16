import { handleActions } from 'redux-actions';

import { addMessageAction, markMessagesAction } from '@store/actions/tradesActions';

import { IChat } from '@interfaces/IChat';

import { TRADE_CHATS } from '@mocks/mocks';

interface INewMessagePayload {
  tradeId: number;
  userId: number;
  message: string;
  time: string;
  isRead: boolean;
}

interface IMarkMessagePayload {
  currentUserId: number;
  tradeId: number;
}

const tradeChatsInitialState: Array<IChat> = TRADE_CHATS;

export const tradeChatsReducer = handleActions(
  {
    [`${addMessageAction}`]: (state, { payload }) => {
      const { tradeId, userId, message, time, isRead } = 
        payload as unknown as INewMessagePayload;

      return state.reduce((newState: IChat[], chat: IChat) => {
        newState.push(chat.tradeId === tradeId ?
          { ...chat, messages: [...chat.messages]
            .concat([{ userId, message, time, isRead }]) } : chat);
        return newState;
      }, []);
    },
    [`${markMessagesAction}`]: (state, { payload }) => {
      const { currentUserId, tradeId } = 
        payload as unknown as IMarkMessagePayload;

      return state.reduce((newState: IChat[], chat: IChat) => {
        newState.push(chat.tradeId === tradeId?
          { 
            ...chat,
            messages: [...chat.messages.filter(message => message.isRead)]
              .concat([...chat.messages.filter(message => !message.isRead)
                .map(unReadMessage => unReadMessage.userId !== currentUserId ? 
                  { ...unReadMessage, isRead: true } : unReadMessage)]) 
          } : chat);

        return newState;
      }, []);
    }
  },
  tradeChatsInitialState
);