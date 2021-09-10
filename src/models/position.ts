import { BaseModel } from './base';

export interface Position extends BaseModel {
  id: number;
  name: string;
  description: string;
  requirements: string;
  typesOfWork: string[];
  thumbnail: string;
  eventId: number;
}
