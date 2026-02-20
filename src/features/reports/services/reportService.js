import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

const getOrgIdOrThrow = () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");
  return orgId;
};

export const fetchReports = async (page = 0, size = 5) => {
  const orgId = getOrgIdOrThrow();

  const response = await apiClient.get(`/api/v1/org/${orgId}/reports`, {
    params: { page, size },
  });

  return response.data;
};

export const createReport = async (reportData) => {
  const orgId = getOrgIdOrThrow();

  const response = await apiClient.post(
    `/api/v1/org/${orgId}/reports`,
    reportData,
  );

  return response.data;
};

export const deleteReport = async (reportId) => {
  const orgId = getOrgIdOrThrow();

  const response = await apiClient.delete(
    `/api/v1/org/${orgId}/reports/${reportId}`,
  );

  return response.data;
};
