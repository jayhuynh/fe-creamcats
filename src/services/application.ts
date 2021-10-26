import Axios from 'axios';

import { Application, User } from '../models';

export const getMyApplications = async (statusFilter: string) => {
  const data = (await Axios.get<Application[]>('/applications/me')).data;
  const applicationWithPosition = await Promise.all(data.map(async application => {
    const position = (await Axios.get(`/positions/${application.positionId}`)).data;
    return {
      ...application,
      position,
    };
  }));
  return applicationWithPosition;
};

export const createApplication = async (application: Required<Pick<Application, 'userId' | 'positionId' | 'notes'>>) => {
  application.notes = !!application.notes ? application.notes : ' ';
  const app = (await Axios.post<Application>('/applications', application)).data;
  const position = (await Axios.get(`/positions/${app.positionId}`)).data;
  return {
    ...app,
    position,
  };
};
