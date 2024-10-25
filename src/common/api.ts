import axios from "axios";
import Cookies from "js-cookie";
export const API_URL = "http://127.0.0.1:8000/api/v1/";

export const $api = axios.create({ baseURL: API_URL });
export const $apiPrivate = axios.create({ baseURL: API_URL });

$apiPrivate.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("wemay-access-token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$apiPrivate.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await $api.post("auth/jwt/jwt/refresh/", {
          refresh: Cookies.get("wemay-refresh-token"),
        });
        localStorage.setItem("wemay-access-token", data.access);
        Cookies.set("wemay-refresh-token", data.refresh);
        return $apiPrivate.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);
