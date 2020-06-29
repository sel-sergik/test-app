import { IUser } from 'interfaces';
import { TPaymentMethod } from 'types';

export interface ITrade {
  id: number;
  buyer: IUser;
  seller: IUser;
  paymentMethod: TPaymentMethod;
  amount: number;
  isPaid: boolean;
  hasUnreadMessages: boolean;
}

export interface ITradeProps {
  id: number;
  buyer: IUser;
  seller: IUser;
  paymentMethod: TPaymentMethod;
  amount: number;
  isPaid: boolean;
  hasUnreadMessages: boolean;
  currentUserId: number;
  activeTradeId: number;
  tradeClick: (tradeId: number) => void;
}