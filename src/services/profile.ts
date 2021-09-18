import Axios from 'axios';

import { Profile } from '../models';

export const getProfile = async () => {
  const profile: any = (await Axios.get('/users/me')).data;
  return {
    id: profile.id,
    email: profile.id,
    fullname: profile.fullname,
    gender: profile.gender,
    age: profile.age,
    password: profile.password,
  } as Profile;
};

// Mock profile
export const getMockProfile = async () =>
  ({
    id: 1,
    email: 'anonymoustesteral3x@gmail.com',
    fullname: 'Al3x',
    gender: 'MALE',
    age: 24,
    password: 'AnonymousTesterAl3x',
  } as Profile);
