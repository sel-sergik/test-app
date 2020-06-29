import { users } from '../constants';
import { IUser } from 'interfaces';

export const findUser = (email: string, password: string) => {
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    const { id, name, avatar, role } = user as IUser;

    return {id, name, avatar, role};
  }

  return null;
};

export const findUserById = (id: number) => {
  const user = users.find(user => user.id === id);

  return user;
};

export const isSeller = (id: number) => {
  return findUserById(id)?.role === 'seller';
};