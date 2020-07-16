import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

import { TRADES } from '@mocks/mocks';

import { findTradeInfo } from '@services/tradeService';

export const getTradesAction = createAction('GET_TRADES');
export const setActiveTradeAction = createAction('SET_ACTIVE_TRADE');
export const getTradeDetailsAction = createAction('GET_TRADE_DETAILS');
export const clearTradeDetailsAction = createAction('CLEAR_TRADE_DETAILS');
export const updateTradesAction = createAction('UPDATE_TRADES');
export const removeTradeAction = createAction('REMOVE_TRADE');
export const getTradeChatsAction = createAction('GET_TRADE_CHATS');
export const addMessageAction = createAction('ADD_MESSAGE');
export const markMessagesAction = createAction('MARK_MESSAGES');

export const getTrades = () => (dispatch: Dispatch) =>
  setTimeout(() => dispatch(getTradesAction(TRADES)), 1000);

export const getTradeDetails = (tradeId: number) => (dispatch: Dispatch) =>
  setTimeout(() => {
    const tradeDetails = findTradeInfo(tradeId);

    tradeDetails
      ? dispatch(getTradeDetailsAction(tradeDetails))
      : dispatch(clearTradeDetailsAction());
  }, 1000);
