import Axios from 'axios';

import { User, Token } from '../models';

export const login = async (credential: Required<Pick<User, 'email' | 'password' | 'type'>>) => {
  const { accessToken } = (await Axios.post('/auth/login', credential)).data;
  return { jwt: accessToken } as Token;
};

