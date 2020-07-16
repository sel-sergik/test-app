import { IUser } from '@interfaces/IUser';
import { PaymentMethods } from '@interfaces/PaymentMethods';

export interface ITrade {
  id: number;
  buyer: IUser;
  seller: IUser;
  paymentMethod: PaymentMethods;
  amount: number;
  isPaid: boolean;
}
