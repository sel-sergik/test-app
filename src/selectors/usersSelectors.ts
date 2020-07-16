import { createSelector } from 'reselect';

import { IUser } from '@interfaces/IUser';

interface ICurrentUserState {
  currentUser: IUser;
}

export const currentUserSelector = createSelector(
  (state: ICurrentUserState) => state.currentUser,
  (currentUserId) => currentUserId
);
