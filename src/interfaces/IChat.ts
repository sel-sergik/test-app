import { IMessage } from "./IMessage";

export interface IChat {
  tradeId: number;
  messages: Array<IMessage>;
}
