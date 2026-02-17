import apiClient from "../../../lib/apiClient";

export const getPersonalizedAdvice = async (payload) => {
  return apiClient.post("/api/v1/advice", payload);
};
