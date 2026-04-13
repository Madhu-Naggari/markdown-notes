import { apiClient, authApiClient } from "../api/client";

export async function registerUser(payload) {
  const response = await authApiClient.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await authApiClient.post("/auth/login", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get("/auth/me");
  return response.data;
}

export async function logoutUser() {
  const response = await authApiClient.post("/auth/logout");
  return response.data;
}

