import axios from "axios";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";
const accessTokenCookie =
  import.meta.env.VITE_ACCESS_TOKEN_COOKIE || "notes_access_token";

export const authApiClient = axios.create({
  baseURL: apiBaseUrl,
});

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

function setAuthorizationHeader(token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

export function loadStoredAuthToken() {
  const token = Cookies.get(accessTokenCookie);
  setAuthorizationHeader(token);
  return token;
}

export function storeAuthToken(token) {
  if (!token) {
    return;
  }

  Cookies.set(accessTokenCookie, token, {
    expires: 1,
    sameSite: "Strict",
  });
  setAuthorizationHeader(token);
}

export function clearAuthToken() {
  Cookies.remove(accessTokenCookie);
  setAuthorizationHeader("");
}

