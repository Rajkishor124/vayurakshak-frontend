import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

const getOrgIdOrThrow = () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");
  return orgId;
};

export const fetchAdminReports = async (page = 0, size = 10) => {
  const orgId = getOrgIdOrThrow();

  const response = await apiClient.get(`/api/v1/org/${orgId}/admin/reports`, {
    params: { page, size },
  });

  return response.data;
};

export const fetchAdminSummary = async () => {
  const orgId = getOrgIdOrThrow();

  const response = await apiClient.get(`/api/v1/org/${orgId}/admin/summary`);

  return response.data;
};
