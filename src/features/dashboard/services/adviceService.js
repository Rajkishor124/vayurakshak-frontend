import apiClient from "../../../lib/apiClient";

export const getPersonalizedAdvice = async (payload) => {
  const response = await apiClient.post("/api/v1/advice", payload);

  return response.data;
};
