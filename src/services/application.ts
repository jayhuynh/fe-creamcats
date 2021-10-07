import Axios from 'axios';

import { Application, User } from '../models';

export const getMyApplications = async (statusFilter: string) => {
  return (await Axios.get<Application[]>('/applications/me')).data;
};

export const createApplication = async (application: Required<Pick<Application, 'userId' | 'positionId' | 'notes'>>) => {
  application.notes = !!application.notes ? application.notes : ' ';
  return (await Axios.post<Application>('/applications', application)).data;
};
