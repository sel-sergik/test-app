import { handleActions } from 'redux-actions';

import * as actions from '@constants/actionTypes';

import { IChat } from '@interfaces/IChat';
import { INewMessagePayload } from '@interfaces/INewMessagePayload';
import { IMarkMessagePayload } from '@interfaces/IMarkMessagePayload';

import { TRADE_CHATS } from '@mocks/mocks';

const tradeChatsInitialState: IChat[] = TRADE_CHATS;
type State = IChat[];
type CombinedPayloads = INewMessagePayload & IMarkMessagePayload;

export const tradeChatsReducer = handleActions<State, CombinedPayloads>(
  {
    [actions.ADD_MESSAGE]: (state, { payload }) => {
      const {
        tradeId,
        userId,
        message,
        time,
        isRead,
      } = payload;

      return state.reduce((newState: IChat[], chat: IChat) => {
        newState.push(
          chat.tradeId === tradeId
            ? {
              ...chat,
              messages: [...chat.messages].concat([
                { userId, message, time, isRead },
              ]),
            }
            : chat
        );
        return newState;
      }, []);
    },
    [actions.MARK_MESSAGES]: (state, { payload }) => {
      const {
        currentUserId,
        tradeId,
      } = payload;

      return state.reduce((newState: IChat[], chat: IChat) => {
        newState.push(
          chat.tradeId === tradeId
            ? {
              ...chat,
              messages: [
                ...chat.messages.filter((message) => message.isRead),
              ].concat([
                ...chat.messages
                  .filter((message) => !message.isRead)
                  .map((unReadMessage) =>
                    unReadMessage.userId !== currentUserId
                      ? { ...unReadMessage, isRead: true }
                      : unReadMessage
                  ),
              ]),
            }
            : chat
        );

        return newState;
      }, []);
    },
  },
  tradeChatsInitialState
);
