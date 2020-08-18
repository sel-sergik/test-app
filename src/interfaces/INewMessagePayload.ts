export interface INewMessagePayload {
  tradeId: number;
  userId: number | undefined;
  message: string;
  time: string;
  isRead: boolean;
}
