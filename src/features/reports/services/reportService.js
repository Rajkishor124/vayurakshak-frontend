import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

const getOrgIdOrThrow = () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");
  return orgId;
};

export const createReport = async (reportData) => {
  const orgId = getOrgIdOrThrow();
  const response = await apiClient.post(
    `/api/v1/org/${orgId}/reports`,
    reportData,
  );
  return response.data;
};

export const fetchReports = async () => {
  const orgId = getOrgIdOrThrow();
  const response = await apiClient.get(`/api/v1/org/${orgId}/reports`);
  return response.data;
};
