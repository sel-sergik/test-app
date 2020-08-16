import { USERS } from '@mocks/mocks';

import { IUser } from '@interfaces/IUser';
import { UserRoles } from '@interfaces/UserRoles';

export const findUser = (email: string, password: string) => {
  const user: IUser | undefined = USERS.find(
    (curUser) => curUser.email === email && curUser.password === password
  );

  if (user) {
    const { id, name, avatar, role } = user;

    return { id, name, avatar, role };
  }

  return null;
};

export const findUserById = (id: number) =>
  USERS.find((user) => user.id === id);

export const isSeller = (id: number) =>
  findUserById(id)?.role === UserRoles.SELLER;
