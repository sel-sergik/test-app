export interface IMessage {
  userId: number | undefined;
  message: string;
  time: string;
  isRead: boolean;
}
