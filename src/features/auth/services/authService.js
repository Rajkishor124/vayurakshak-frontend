import apiClient from "../../../lib/apiClient";
import { storage } from "../../../lib/storage";

export const registerUser = async (data) => {
  return apiClient.post("/api/v1/auth/register", data);
};

export const loginUser = async (data) => {
  const response = await apiClient.post("/api/v1/auth/login", data);

  // Adjust according to backend response structure
  const { token, user } = response;

  storage.setToken(token);
  storage.setUser(user);
  storage.setOrgId(user?.orgId);

  return response;
};
