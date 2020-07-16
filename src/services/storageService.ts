interface IStorageUser {
  id: number;
  name: string;
  avatar: string;
  role: number | undefined;
}

export const getCurrentUserFromStorage = () => localStorage.getItem('currentUser');

export const removeCurrentUserFromStorage = () => localStorage.removeItem('currentUser');

export const setCurrentUserToStorage = (user: IStorageUser) => localStorage.setItem('currentUser', JSON.stringify(user));