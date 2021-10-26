import Axios from 'axios';

import { Organization, Profile } from '../models';

export const getMyProfile = async () => {
  return (await Axios.get<Profile>('/users/me')).data;
};

export const getOrganizationProfile = async () => {
  return (await Axios.get<Profile>('/organizations/me')).data;
};


export const getOrganizationById = async (id: number) => {
  return (await Axios.get<Profile>(`/organizations/${id}`)).data;
};

export const updateMyProfile = async (data: any) => {
  const response: any = (
    await Axios.post('/users/me', data)
  ).data;
  return response;
};

export const updateOrganizationProfile = async (data: Organization) => {
  // Open the comment when backend is ready

  // const response: any = (
  //   await Axios.post(`/organizations/${data.id}`, data)
  // ).data;
  // return response;
};
