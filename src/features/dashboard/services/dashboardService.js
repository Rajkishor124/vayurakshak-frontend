import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

export const fetchDashboard = async () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");

  const response = await apiClient.get(`/api/v1/org/${orgId}/dashboard`);

  return response.data;
};
