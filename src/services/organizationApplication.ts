import Axios from 'axios';
import { stringify } from 'querystring';

import { OrganizationApplication } from '../models/organization-application';

export const getApplications = async (organizationId: Number, filters: any) => {
  const organizationApplications: any = (
    await Axios.get(
      `/organizations/${organizationId}/applications?${stringify(filters)}`,
    )
  ).data;
  const applications = organizationApplications.data.map(
    (application: any) =>
      ({
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
