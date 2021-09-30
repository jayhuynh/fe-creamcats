import Axios from 'axios';

import { Application, User } from '../models';

export const getMyApplications = async (statusFilter: string) => {
  return (await Axios.get<Application[]>('/applications/me')).data;
};

// @Alex please remove if you don't need it
// // Mock posts until add token
// const mockApplications: any[] = [
//   {
//     id: 1,
//     posCover:
//       'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
//     name: 'Position 1',
//     status: 'APPLIED',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
//     releaseTime: '2021-09-11 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
//   },
//   {
//     id: 2,
//     posCover:
//       'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
//     name: 'Position 2',
//     status: 'PASSED',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
//     releaseTime: '2021-08-26 22:35:00',
//   },
//   {
//     id: 3,
//     posCover:
//       'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
//     name: 'Position 3',
//     status: 'REJECTED',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
//     releaseTime: '2021-08-26 20:42:00',
//   },
//   {
//     id: 4,
//     posCover:
//       'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
//     name: 'Position 4',
//     status: 'PENDING',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
//     releaseTime: '2021-09-10 00:00:00', //This should be calculated in future, e.g. use the current time minus the release time
//   },
//   {
//     id: 5,
//     posCover:
//       'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
//     name: 'Position 5',
//     status: 'ONGOING',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
//     releaseTime: '2021-08-26 22:35:00',
//   },
//   {
//     id: 6,
//     posCover:
//       'https://www.brisbane.qld.gov.au/sites/default/files/styles/hero_image/public/images/2021-03/1600x900-sbp-brisbane-sign.jpg?itok=jiR58xQI',
//     name: 'Position 6',
//     status: 'PASSED',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
//     releaseTime: '2021-08-26 20:42:00',
//   },
//   {
//     id: 7,
//     posCover:
//       'https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg',
//     name: 'Position 7',
//     status: 'APPLIED',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat. ',
//     releaseTime: '2021-09-11 00:00:00',
//   },
//   {
//     id: 8,
//     posCover:
//       'https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4',
//     name: 'Position 8',
//     status: 'PENDING',
//     description:
//       'Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat.',
//     releaseTime: '2021-08-26 22:35:00',
//   },
// ];
//
// export const getMockApplications = async (statusFilter: string) => {
//   if (statusFilter === 'ALL') {
//     return mockApplications.map(
//       (application: any) =>
//         ({
//           id: application.id,
//           title: application.name,
//           description: application.description,
//           releaseTime: application.releaseTime,
//           status: application.status,
//           requirements: application.requirements,
//           typesOfWork: application.typesOfWork,
//           thumbnail: application.posCover,
//           eventId: application.eventId,
//         } as Application),
//     );
//   } else {
//     const filteredApplications = mockApplications.filter(application => {
//       return application.status === statusFilter;
//     });
//
//     return filteredApplications.map(
//       (application: any) =>
//         ({
//           id: application.id,
//           title: application.name,
//           description: application.description,
//           releaseTime: application.releaseTime,
//           status: application.status,
//           requirements: application.requirements,
//           typesOfWork: application.typesOfWork,
//           thumbnail: application.posCover,
//           eventId: application.eventId,
//         } as Application),
//     );
//   }
// };

export const createApplication = async (application: Required<Pick<Application, 'userId' | 'positionId' | 'notes'>>) => {
  application.notes = !!application.notes ? application.notes : ' ';
  return (await Axios.post<Application>('/applications', application)).data;
};
