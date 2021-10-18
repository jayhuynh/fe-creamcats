import Axios from 'axios';

export const getEvents = async (organizationId: number) => {
  const organizationEvents = (
    await Axios.get(`/organizations/${organizationId}/events`)
  ).data;

  return organizationEvents.data;
};

export const getEventById = async (eventId: number) => {
  const event = (await Axios.get(`/events/${eventId}`)).data;

  return {
    id: event.id,
    name: event.name,
    description: event.desc,
    gallery: event.gallery,
    organizationId: event.organizationId,
    startAt: event.startTime,
    endAt: event.endTime,
    location: event.location,
  };
};
