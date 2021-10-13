import Axios from 'axios';

export const uploadImages = async (
  files: any[],
) => {
  const formData = new FormData();
  files.forEach(file => {formData.append('images', file);});
  const urls: string[] = (await Axios.post('/images', formData)).data;
  console.log(urls);
  return urls;
};
