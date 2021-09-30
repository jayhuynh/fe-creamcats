import Axios from 'axios';

import { OrganizationApplication } from '../models/organization-application';

export const getApplications = async (id: any) => {
  const organizationApplications: any = await Axios.get(
    `/organizations/${id}/applications`,
  );
  return organizationApplications.data.map(
    (application: any) =>
      ({
        applicantId: application.applicant.id,
        applicantName: application.applicant.name,
        gender: application.gender,
        eventId: application.event.id,
        eventName: application.event.name,
        positionId: application.position.id,
        positionName: application.position.name,
        status: application.status,
      } as OrganizationApplication),
  );
};

// Mock posts until add token
const mockOrganizationApplications: any = {
  data: [
    {
      applicantId: 1,
      applicantName: 'Alisa Thompson',
      gender: 'FEMALE',
      eventId: 27,
      eventName: 'Event and Fundraising Coordinator 1',
      positionId: 1,
      positionName: 'Driver',
      status: 'ACCEPTED',
      appliedAt: '2021-09-30',
    },
    {
      applicantId: 1,
      applicantName: 'Alisa Thompson',
      gender: 'FEMALE',
      eventId: 29,
      eventName: 'Event and Fundraising Coordinator 3',
      positionId: 3,
      positionName: 'Driver Mentor',
      status: 'REJECTED',
      appliedAt: '2021-09-29',
    },
    {
      applicantId: 1,
      applicantName: 'Alisa Thompson',
      gender: 'FEMALE',
      eventId: 27,
      eventName: 'Event and Fundraising Coordinator 1',
      positionId: 2,
      positionName: 'Emergency Relief Officer',
      status: 'REJECTED',
      appliedAt: '2021-09-29',
    },
    {
      applicantId: 2,
      applicantName: 'Benjamin Franklin',
      gender: 'MALE',
      eventId: 31,
      eventName: 'Event and Fundraising Coordinator 5',
      positionId: 4,
      positionName: 'Manager',
      status: 'PENDING',
      appliedAt: '2021-09-30',
    },
    {
      applicantId: 2,
      applicantName: 'Benjamin Franklin',
      gender: 'MALE',
      eventId: 86,
      eventName: 'Red Cross 0',
      positionId: 5,
      positionName: 'Secretary',
      status: 'PENDING',
      appliedAt: '2021-09-29',
    },
    {
      applicantId: 3,
      applicantName: 'Harry Marshell',
      gender: 'MALE',
      eventId: 86,
      eventName: 'Red Cross 0',
      positionId: 5,
      positionName: 'Secretary',
      status: 'PENDING',
      appliedAt: '2021-08-23',
    },
    {
      applicantId: 3,
      applicantName: 'Harry Marshell',
      gender: 'MALE',
      eventId: 88,
      eventName: 'Red Cross 2',
      positionId: 6,
      positionName: 'Emergency Relief Officer',
      status: 'PENDING',
      appliedAt: '2021-08-23',
    },
    {
      applicantId: 3,
      applicantName: 'Harry Marshell',
      gender: 'MALE',
      eventId: 27,
      eventName: 'Event and Fundraising Coordinator 1',
      positionId: 1,
      positionName: 'Driver',
      status: 'PENDING',
      appliedAt: '2021-08-23',
    },
  ],
  number: 8,
};

function mockFilteredApplications(id: number, filters: any) {
  const { gender, event, position } = filters;
  let genderFilteredApplications: any[] = [];

  mockOrganizationApplications.data.forEach((application: any) => {
    if (application.gender === gender || gender === '') {
      genderFilteredApplications.push(application);
    }
  });

  let eventFilteredApplications: any[] = [];
  genderFilteredApplications.forEach((application: any) => {
    if (application.eventId === event || event === -1) {
      eventFilteredApplications.push(application);
    }
  });

  let positionFilteredApplications: any[] = [];
  eventFilteredApplications.forEach((application: any) => {
    if (application.positionId === position || position === -1) {
      positionFilteredApplications.push(application);
    }
  });
  return positionFilteredApplications;
}

export const getMockOrganizationApplications = async (
  organizationId: number,
  filters: any,
) => {
  return {
    organizationApplications: mockFilteredApplications(organizationId, filters),
    number: mockOrganizationApplications.number,
  };
};
