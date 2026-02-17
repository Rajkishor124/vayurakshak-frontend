import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

export const createReport = async (reportData) => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");

  return apiClient.post(`/api/v1/org/${orgId}/reports`, reportData);
};

export const fetchReports = async () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");

  return apiClient.get(`/api/v1/org/${orgId}/reports`);
};
