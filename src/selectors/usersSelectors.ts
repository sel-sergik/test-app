import { IUser } from '@interfaces/IUser';

interface ICurrentUserState {
  currentUser: IUser;
}

export const currentUserSelector = 
  (state: ICurrentUserState) => state.currentUser;
