import { IMessage } from '@interfaces/IMessage';

export interface IChat {
  tradeId: number;
  messages: IMessage[];
}
