import { BaseModel } from './base';

export interface Profile extends BaseModel {
  id: number;
  email?: string;
  fullname: string;
  gender: string;
  age: number;
  password?: string;
}
