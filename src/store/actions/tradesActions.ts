import { createAction } from 'redux-actions';

export const requestTradesAction = createAction('REQUEST_TRADES');
export const getTradesAction = createAction('GET_TRADES');
export const setActiveTradeAction = createAction('SET_ACTIVE_TRADE');
export const requestTradeDetailsAction = createAction('REQUEST_TRADE_DETAILS');
export const getTradeDetailsAction = createAction('GET_TRADE_DETAILS');
export const clearTradeDetailsAction = createAction('CLEAR_TRADE_DETAILS');
export const updateTradesAction = createAction('UPDATE_TRADES');
export const removeTradeAction = createAction('REMOVE_TRADE');
export const getTradeChatsAction = createAction('GET_TRADE_CHATS');
export const addMessageAction = createAction('ADD_MESSAGE');
export const markMessagesAction = createAction('MARK_MESSAGES');
