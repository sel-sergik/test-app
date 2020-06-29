import { createSelector } from 'reselect';
import { ICurrentUserState } from '../interfaces';

export const currentUserSelector = createSelector(
  (state: ICurrentUserState) => state.currentUser,
  currentUserId => currentUserId
);
