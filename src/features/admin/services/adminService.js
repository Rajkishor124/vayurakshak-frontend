import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

const getOrgIdOrThrow = () => {
  const orgId = storage.getOrgId();
  if (!orgId) {
    throw new Error("Organization not found");
  }
  return orgId;
};

// 📊 Paginated Admin Reports
export const fetchAdminReports = async (page = 0, size = 10) => {
  const orgId = getOrgIdOrThrow();

  return apiClient.get(`/api/v1/org/${orgId}/admin/reports`, {
    params: {
      page,
      size,
    },
  });
};

// 📈 Admin Summary
export const fetchAdminSummary = async () => {
  const orgId = getOrgIdOrThrow();

  return apiClient.get(`/api/v1/org/${orgId}/admin/summary`);
};
