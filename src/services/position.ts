import Axios from 'axios';
import qs from 'querystring';

import { Position } from '../models';
import {
  FilterFormInputs,
  parseQuery,
} from '../pages/home/components/filter/Filters';

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
  let organizationName = 'Unknown';

  //Is using promise right in here? Or I should create another fetch function and combine the data in UI?
  await new Promise(async resolve => {
    currentPosition = (await Axios.get(`/positions/${id}`)).data;
    resolve(currentPosition.eventId);
  }).then(async eventId => {
    currentEvent = (await Axios.get(`/events/${eventId}`)).data;
  });

  console.log(currentPosition);

  //   {
  //     "id": 1,
  //     "name": "Drive for Life",
  //     "desc": "Atque possimus et ea et voluptas quos est explicabo ut. Repellendus quidem vel quo nisi eos. Ea itaque et. Veritatis molestias sint accusamus officia qui commodi molestiae.",
  //     "gallery": [],
  //     "startTime": "2021-09-26T15:46:31.623Z",
  //     "endTime": "2021-09-28T06:23:31.007Z",
  //     "location": "690, Gympie Road, LAWNTON QLD 4501",
  //     "organizationId": 1
  // }

  return {
    id: currentPosition.id,
    name: currentPosition.name,
    description: currentPosition.desc,
    requirements: currentPosition.requirements,
    createdAt: currentPosition.timeCreated,
    thumbnail: currentPosition.thumbnail,
    eventId: currentPosition.eventId,
    location: currentEvent.location,
    //typesOfWork: currentPosition.typesOfWork,
    carouselItems: currentEvent.gallery,
    startAt: currentEvent.startTime,
    endAt: currentEvent.endTime,
    numberOfApplicants: 45,
  };
};
