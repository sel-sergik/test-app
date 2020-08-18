import { handleActions, Action } from 'redux-actions';

import * as actions from '@constants/actionTypes';

import { IChat } from '@interfaces/IChat';
import { INewMessagePayload } from '@interfaces/INewMessagePayload';
import { IMarkMessagePayload } from '@interfaces/IMarkMessagePayload';

import { TRADE_CHATS } from '@mocks/mocks';

const tradeChatsInitialState: Array<IChat> = TRADE_CHATS;
type State = IChat[];
type CombinedPayloads = INewMessagePayload | IMarkMessagePayload;

export const tradeChatsReducer = handleActions<State, CombinedPayloads>(
  {
    [actions.ADD_MESSAGE]: (state, { payload }: Action<INewMessagePayload>) => {
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
    [actions.MARK_MESSAGES]: (state, { payload }: Action<IMarkMessagePayload>) => {
      const {
        currentUserId,
        tradeId,
      } = (payload as unknown) as IMarkMessagePayload;

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
