import apiClient from "../../../lib/apiClient";

export const registerUser = async (data) => {
  const response = await apiClient.post("/api/v1/auth/register", data);
  return response.data; // return only actual data
};

export const loginUser = async (data) => {
  const response = await apiClient.post("/api/v1/auth/login", data);
  return response.data; // return { token }
};
