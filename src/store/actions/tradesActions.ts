import { createAction } from 'redux-actions';

import * as actions from '@constants/actionTypes';

import { INewMessagePayload } from '@interfaces/INewMessagePayload';
import { IMarkMessagePayload } from '@interfaces/IMarkMessagePayload';

export const requestTradesAction = createAction(actions.REQUEST_TRADES);
export const getTradesAction = createAction(actions.GET_TRADES);
export const setActiveTradeAction = createAction(actions.SET_ACTIVE_TRADE);
export const getTradeDetailsAction = createAction(actions.GET_TRADE_DETAILS);
export const updateTradesAction = createAction(actions.UPDATE_TRADES);
export const removeTradeAction = createAction(actions.REMOVE_TRADE);
export const getTradeChatsAction = createAction(actions.GET_TRADE_CHATS);
export const addMessageAction = 
  createAction<INewMessagePayload>(actions.ADD_MESSAGE);
export const markMessagesAction = 
  createAction<IMarkMessagePayload>(actions.MARK_MESSAGES);
export const requestTradeDetailsAction = 
  createAction(actions.REQUEST_TRADE_DETAILS);
export const clearTradeDetailsAction = 
  createAction(actions.CLEAR_TRADE_DETAILS);