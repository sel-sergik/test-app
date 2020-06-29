import { IUser, ITrade, ITradeDetails, IChat } from 'interfaces';

export interface ITradesState {
  trades: Array<ITrade>;
}

export interface ICurrentUserState {
  currentUser: IUser;
}

export interface IActiveTradeState {
  activeTradeId: number;
}

export interface ITradeDetailsState {
  tradeDetails: ITradeDetails;
}

export interface ITradeChatsState {
  tradeChats: Array<IChat>;
}