import axios, { AxiosRequestConfig } from "axios";
import { AUTHENTICATION_COOKIE } from "../../features/homepage/types";
import getUUID from "../get-uuid";

const isDevelopment = (origin: string) =>
  origin.includes("http://0.0.0.0") || origin.includes("http://localhost");

const getURL = (): string => {
  const origin = window.location.origin.toString();
  if (isDevelopment(origin)) {
    return "http://0.0.0.0:3000";
  } else {
    return process.env.BACK_END_URL || "";
  }
};

const instance = axios.create({
  baseURL: getURL(),
});

const requestHandler = (request: AxiosRequestConfig) => {
  /**
   * Automatic transform data to url params for get requests
   */
  if (request.method?.toLowerCase() === "get") {
    const paramString = new URLSearchParams(request.data).toString();
    request.url = `${request.url}?${paramString}`;
    request.data = undefined;
    request.headers = {
      [AUTHENTICATION_COOKIE]: getUUID(),
      ...request.headers,
    };
  }
  return request;
};

const errorHandler = (err: any) => {};

instance.interceptors.request.use(requestHandler, errorHandler);

export default instance;
