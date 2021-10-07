import { BaseModel } from './base';

export interface Organization extends BaseModel {
  email: string;
  desc: string;
  addr: string;
  phone: string;
  avatar: string;
}
