import { AxiosRequestConfig } from "axios";

export const LOADING_OFFSET = 3;

export const API_REQUEST = {
  USERS: { method: "GET", url: "/users" } as AxiosRequestConfig,
  LIKE: { method: "POST", url: "/users/like" } as AxiosRequestConfig,
  PASS: { method: "POST", url: "/users/pass" } as AxiosRequestConfig,
};
