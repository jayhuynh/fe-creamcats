import Axios from 'axios';

import { Position } from '../models';

export const getPositions = async () => {
  const positions = (await Axios.get('/positions')).data;
  return positions.map((position: any) => ({
    id: position.id,
    name: position.name,
    description: position.desc,
    requirements: position.requirements,
    typesOfWork: position.typesOfWork,
    createdAt: position.timeCreated,
    thumbnail: position.thumbnail,
    eventId: position.eventId,
  } as Position));
};

