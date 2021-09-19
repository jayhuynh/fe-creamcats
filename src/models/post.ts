import { BaseModel } from './base';

export interface Post extends BaseModel {
  id: number;
  title: string;
  postCover: string;
  content: string;
}
