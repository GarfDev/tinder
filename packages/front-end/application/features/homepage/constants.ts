import { AxiosRequestConfig } from "axios";

export const LOADING_OFFSET = 3;

export const API_REQUEST = {
  USERS: { method: "GET", url: "/users" } as AxiosRequestConfig,
};
