import Axios from 'axios';
import { PageableResponse } from '../models/base';
import { Event, VoluntaryEvent } from '../models';
import { CreateEventFormInputs } from '../pages/organization/components/CreateEventDialog';

export const getOrganizationVoluntaryEvents = async (organizationId: number, status: 'ongoing' | 'past') => {
  return (await Axios.get<PageableResponse<VoluntaryEvent>>(
    `/organizations/${organizationId}/events?`,
    {
      params: {
        status: status,
      },
    })).data;
};

export const createOrganizationVoluntaryEvents = async (event: CreateEventFormInputs) => {
  return event as VoluntaryEvent;
};
