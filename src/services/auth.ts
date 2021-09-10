import Axios from 'axios';

import { User, Token } from '../models';

export const login = async (credential: Required<Pick<User, 'email' | 'password'>>) => {
  const { accessToken } = (await Axios.post('/auth/login', credential)).data;
  return { jwt: accessToken } as Token;
};

export const me = async () => ({ email: 'testemail@email.com', username: 'this is user name' } as User);
