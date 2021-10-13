import { BaseModel } from './base';

export interface Post extends BaseModel {
  title: string;
  postCover: string;
  content: string;
}
