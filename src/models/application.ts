import { BaseModel } from './base';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'PENDING',
}

export interface Application {
  userId: number;
  positionId: number;
  notes: string;
  status: ApplicationStatus;
}
