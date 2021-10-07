import { BaseModel } from './base';

export interface VoluntaryEvent extends BaseModel {
  name: string;
  desc: string;
  gallery: string[];
  startTime: Date;
  endTime: Date;
  location: string;
  organizationId: number;
}
