import apiClient from "../../../lib/apiClient";

export const fetchAdminReports = async (orgId, page = 0, size = 10) => {
  return await apiClient.get(
    `/api/v1/org/${orgId}/admin/reports?page=${page}&size=${size}`,
  );
};

export const fetchAdminSummary = async (orgId) => {
  return await apiClient.get(`/api/v1/org/${orgId}/admin/summary`);
};
