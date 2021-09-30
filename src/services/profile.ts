import Axios from 'axios';

import { Profile } from '../models';

export const getProfile = async () => {
  return (await Axios.get<Profile>('/users/me')).data;
};

export const updateProfile = async (data: Profile) => {
  const response: any = (
    await Axios.post('/users/me', data, {
      headers: { Authorization: 'Bearer {my_token}' },
    })
  ).data;
  return response;
};
