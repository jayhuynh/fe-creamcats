import Axios from 'axios';
import { stringify } from 'querystring';

import { OrganizationApplication } from '../models/organization-application';
import { Profile } from '../models';

export const getApplications = async (organizationId: Number, filters: any) => {
  const organizationApplications: any = (
    await Axios.get(
      `/organizations/${organizationId}/applications?${stringify(filters)}`,
    )
  ).data;
  const applications = organizationApplications.data.map(
    (application: any) =>
      ({
        ...application,
        applicantId: application.applicant.id,
        applicantName: application.applicant.fullname,
        gender: application.applicant.gender,
        eventId: application.event.id,
        eventName: application.event.name,
        positionId: application.position.id,
        positionName: application.position.name,
        status: application.status,
      } as OrganizationApplication),
  );
  return {
    organizationApplications: applications,
    number: organizationApplications.total,
  };
};

export const getApplicantDetails = async (applicantId: number): Promise<Profile> => {
  return (await Axios.get(`/users/${applicantId}`)).data;
};

export const updateApplication = async (applicationId: number, status: string, feedback: string): Promise<any> => {
  const application = (await Axios.patch(`/applications/${applicationId}`, {
    status,
    feedback,
  })).data;
  return {
    applicationId,
    status,
  };
};
