import { BaseModel } from './base';

export interface User extends BaseModel {
  email: string;
  password?: string;
  type: 'volunteer' | 'organization';
}
