import apiClient from "../../../lib/apiClient";

export const registerUser = async (data) => {
  return apiClient.post("/api/v1/auth/register", data);
};

export const loginUser = async (data) => {
  return apiClient.post("/api/v1/auth/login", data);
};
