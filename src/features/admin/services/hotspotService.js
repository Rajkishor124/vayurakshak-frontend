import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

export const fetchHotspots = async () => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");

  const response = await apiClient.get(`/api/v1/org/${orgId}/hotspots`);

  return response.data;
};
