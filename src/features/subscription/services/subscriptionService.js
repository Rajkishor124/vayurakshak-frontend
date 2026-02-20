import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

export const upgradePlan = async (plan) => {
  const orgId = storage.getOrgId();
  if (!orgId) throw new Error("Organization not found");

  const response = await apiClient.put(
    `/api/v1/org/${orgId}/admin/upgrade-plan`,
    { plan },
  );

  return response.data;
};
