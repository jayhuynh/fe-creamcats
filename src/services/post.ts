import Axios from 'axios';

import { Post } from '../models';

export const getPosts = async () => {
  const posts: any = await Axios.get('/posts/me', {
    headers: { Authorization: 'Bearer {my_token}' },
  });
  return posts.map(
    (post: any) =>
      ({
        id: post.id,
        title: post.id,
        postCover: post.thumbnail,
        content: post.content,
      } as Post),
  );
};

// Mock posts until add token
const mockPosts: any[] = [
  {
    id: 1,
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
    title: 'Resident Admissions Volunteer',
    content:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
  {
    id: 2,
    thumbnail:
      'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
    title: 'Helping orphan children',
    content:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
  {
    id: 3,
    thumbnail:
      'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
    title: 'We are a family',
    content:
      'Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.',
  },
];

export const getMockPosts = async () => {
  return mockPosts.map(
    (post: any) =>
      ({
        id: post.id,
        title: post.title,
        postCover: post.thumbnail,
        content: post.content,
      } as Post),
  );
};
