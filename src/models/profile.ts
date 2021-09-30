import { BaseModel } from './base';

export interface Profile extends BaseModel {
  email: string;
  fullname: string;
  gender: string;
  age: number;
  profilePic: string;
}
