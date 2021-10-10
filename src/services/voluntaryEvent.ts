import Axios from 'axios';
import { PageableResponse } from '../models/base';
import { VoluntaryEvent } from '../models';

export const getOrganizationVoluntaryEvents = async (organizationId: number, status: 'ongoing' | 'past') => {
  return (await Axios.get<PageableResponse<VoluntaryEvent>>(
    `/organizations/${organizationId}/events?`,
    {
      params: {
        status: status,
      },
    })).data;
};
