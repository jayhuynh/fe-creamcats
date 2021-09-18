import Axios from 'axios';

import { Tag } from '../models';

export const getTags = async () => {
  const tags = (await Axios.get('/tags')).data;
  return tags.map((tag: string) => ({ name: tag })) as Tag[];
};
