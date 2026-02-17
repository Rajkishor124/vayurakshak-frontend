import apiClient from "../../../lib/apiClient";

export const fetchDashboard = async (orgId) => {
  const response = await apiClient.get(`/api/v1/org/${orgId}/dashboard`);
  return response.data;
};
