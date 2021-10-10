import { BaseModel } from './base';

export interface Event extends BaseModel {
  id: number;
  name: string;
  description: string;
  gallery: string[];
  orgnizationId: number;
  startAt: Date;
  endAt: Date;
  location: string;
}
