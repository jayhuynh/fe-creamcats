import { User, Token } from '../models';

export const login = async (credential: Required<Pick<User, 'email' | 'password'>>) => {
  console.log(credential);
  return { jwt: 'this_is_jwt_token' } as Token;
};

export const me = async () => ({ email: 'testemail@email.com', username: 'this is user name' } as User);
