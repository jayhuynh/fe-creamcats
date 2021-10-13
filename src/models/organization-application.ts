import { BaseModel } from './base';

export interface OrganizationApplication extends BaseModel {
  applicantId: string;
  applicantName: string;
  gender: string;
  eventId: number;
  eventName: string;
  positionId: number;
  positionName: string;
  status: string;
}
