import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import {
  AXIOS_CLIENT_TIMEOUT,
  AXIOS_CONTENT_TYPE,
  AXIOS_REFRESH_TIMEOUT,
} from "@/constants/api";
import { EMPTY } from "@/constants/common";
import { useAuthStore } from "@/stores";
import { type ApiResponse } from "@/types/api";
import { type TAuthSession } from "@/types/features";

import { AUTH_ENDPOINTS } from "./end-point";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? EMPTY.str;
const apiSubfix = process.env.NEXT_PUBLIC_API_SUBFIX ?? EMPTY.str;

const baseURL = [
  apiUrl.replace(/\/+$/, EMPTY.str),
  apiSubfix.replace(/^\/+/, EMPTY.str),
]
  .filter(Boolean)
  .join("/");

export const axiosClient = axios.create({
  baseURL,
  timeout: AXIOS_CLIENT_TIMEOUT,
  headers: {
    Accept: AXIOS_CONTENT_TYPE,
  },
});

const axiosRefresh = axios.create({
  baseURL,
  timeout: AXIOS_REFRESH_TIMEOUT,
  headers: {
    Accept: AXIOS_CONTENT_TYPE,
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.session?.accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: Handle 401 and refresh token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers && token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosClient(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const state = useAuthStore.getState();
    const refreshToken = state.session?.refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().clearAuth();
      processQueue(error, null);
      return Promise.reject(error);
    }

    try {
      const response = await axiosRefresh.post<
        ApiResponse<{ session: TAuthSession }>
      >(AUTH_ENDPOINTS.refresh, { refreshToken });

      const { session } = response.data.data!;
      useAuthStore.getState().updateSession(session);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
      }

      processQueue(null, session.accessToken);
      isRefreshing = false;

      return axiosClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      processQueue(refreshError as AxiosError, null);
      isRefreshing = false;
      return Promise.reject(refreshError);
    }
  },
);

export default axiosClient;
