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

export const getCurrentPosition = async (id:number) => {
  // const currentPosition = (await Axios.get(`/positions/${id}`)).data;
  const currentPosition = {
    id: 1,
    name: 'asdf',
    desc: 'bla',
    requirements: 'bla',
    typesOfWork: [],
    createdAt: new Date(),
    thumbnail: '',
    eventId:3,
  };
  return {
    id: currentPosition.id,
    name: currentPosition.name,
    description: currentPosition.desc,
    requirements: currentPosition.requirements,
    typesOfWork: currentPosition.typesOfWork,
    createdAt: currentPosition.createdAt,
    thumbnail: currentPosition.thumbnail,
    eventId: currentPosition.eventId,
  } as Position;
};
