import Axios from 'axios';
import qs from 'querystring';

import { Position } from '../models';
import { FilterFormInputs, parseQuery } from '../pages/home/components/Filters';

export const getPositions = async (filters: FilterFormInputs) => {
  const queryString = qs.stringify(parseQuery(filters));
  const positions = (await Axios.get(`/positions?${queryString}`)).data;
  return positions.map(
    (position: any) =>
      ({
        id: position.id,
        name: position.name,
        description: position.desc,
        requirements: position.requirements,
        typesOfWork: position.typesOfWork,
        createdAt: position.timeCreated,
        thumbnail: position.thumbnail,
        eventId: position.eventId,
      } as Position),
  );
};

export const getCurrentPosition = async (id: number) => {
  let currentPosition: any = {};
  let currentEvent: any = {};
  let currentOrganization = { name: 'Placeholder' };

  //Is using promise right in here? Or I should create another fetch function and combine the data in UI?
  await new Promise(async resolve => {
    currentPosition = (await Axios.get(`/positions/${id}`)).data;
    resolve(currentPosition.eventId);
  }).then(async eventId => {
    currentEvent = (await Axios.get(`/events/${eventId}`)).data;
  });

  // Also need organization API here to fetch the organization name

  return {
    id: currentPosition.id,
    thumbnail: currentPosition.thumbnail,
    name: currentPosition.name,
    overview: currentPosition.desc,
    carouselItems: currentEvent.gallery,
    brief: [
      {
        type: 'Location',
        content: currentEvent.location,
      },
      {
        type: 'Type of work',
        content: currentPosition.typesOfWork.join(' & '),
      },
      {
        type: 'Commitment',
        content: currentPosition.commitment,
      },
      {
        type: 'Training',
        content: currentPosition.training,
      },
      {
        type: 'Time required',
        content: currentPosition.timeRequired,
      },
      {
        type: 'Number of applicants',
        content:
          typeof currentPosition.numberOfApplicants === 'undefined'
            ? undefined
            : currentPosition.numberOfApplicants + ' people',
      },
      {
        type: 'Others',
        content: currentPosition.others,
      },
    ],
    createdAt: currentPosition.timeCreated,
    eventId: currentPosition.eventId,

    // Attribute(s) below are absent in the API
    subtitle: currentPosition.subtitle,
    organization: currentOrganization.name,
    description: currentPosition.description,

    //Attribute(s) below I don't know what for
    requirements: currentPosition.requirements,

    //Attribute(s) below is required by Position interface (?)
    typesOfWork: currentPosition.typesOfWork,
  };
};
