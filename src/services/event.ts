const events = [
  {
    id: 27,
    name: 'Event and Fundraising Coordinator 1',
    desc: 'Ex hic maxime praesentium labore natus laborum consequatur commodi illo. A rem ex. Et est id aut. At ipsa quae ex earum.',
    gallery: [],
    startTime: '2021-08-22T02:41:12.830Z',
    endTime: '2021-08-22T02:41:12.830Z',
    location: 'Unit 1, 89 Factory Road, OXLEY QLD 4075',
    organizationId: 4,
  },
  {
    id: 29,
    name: 'Event and Fundraising Coordinator 3',
    desc: 'Qui qui nobis consequuntur repudiandae ad et enim est et. Quis autem natus porro. Reprehenderit sit soluta molestiae fugiat beatae repellendus qui eveniet.',
    gallery: [],
    startTime: '2021-05-28T04:33:29.823Z',
    endTime: '2021-05-30T04:33:29.823Z',
    location: 'Unit 1, 89 Factory Road, OXLEY QLD 4075',
    organizationId: 4,
  },
  {
    id: 31,
    name: 'Event and Fundraising Coordinator 5',
    desc: 'Rerum fugit et dolor illum ipsam cupiditate. Neque dolores aliquam voluptatibus odio. Et id magnam odio provident molestias corporis sit unde quasi. Quasi aut rerum laboriosam sunt sit quo. Molestiae qui amet consectetur debitis soluta amet ipsum esse. Cum aliquid iure et.',
    gallery: [],
    startTime: '2022-01-04T22:48:19.105Z',
    endTime: '2022-01-06T22:48:19.105Z',
    location: 'Unit 1, 89 Factory Road, OXLEY QLD 4075',
    organizationId: 4,
  },
  {
    id: 86,
    name: 'Red Cross 0',
    desc: 'Corporis sed eaque magni. Eligendi harum doloribus voluptates perspiciatis corrupti. Sequi odio esse est itaque qui quasi reiciendis est recusandae. Omnis vel doloremque dolores tenetur.',
    gallery: [],
    startTime: '2021-09-20T06:56:05.683Z',
    endTime: '2021-09-21T06:56:05.683Z',
    location: '669 Sherwood Road, SHERWOOD QLD 4075',
    organizationId: 12,
  },
  {
    id: 88,
    name: 'Red Cross 2',
    desc: 'Iusto veritatis vitae porro assumenda enim eos at incidunt. Beatae enim officia sapiente suscipit cupiditate. Maxime quidem asperiores laboriosam. Molestias minus accusamus et et. Similique qui expedita eum dolorem dolores est corporis aliquam hic. Inventore dolores aut ut voluptas.',
    gallery: [],
    startTime: '2021-07-10T11:12:04.076Z',
    endTime: '2021-07-13T11:12:04.076Z',
    location: '669 Sherwood Road, SHERWOOD QLD 4075',
    organizationId: 12,
  },
];

export const getEvents = async (organizationId: number) => {
  let organizationEvents: any[] = [];

  events.forEach((event: any) => {
    if (event.organizationId === organizationId) {
      organizationEvents.push(event);
    }
  });

  return organizationEvents;
};
