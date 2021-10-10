import Axios from 'axios';

export const getEvents = async (organizationId: number) => {
  const organizationEvents = (
    await Axios.get(`/organizations/${organizationId}/events`)
  ).data;

  return organizationEvents.data;
};
