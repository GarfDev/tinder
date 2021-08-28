import axios, { AxiosRequestConfig } from "axios";
import { AUTHENTICATION_COOKIE } from "../../features/homepage/types";
import getUUID from "../get-uuid";

/**
 * Base on current origin to consider return
 * variables that maybe come from docker or
 * just return dev backend address
 * @returns BACK_END_URL
 */
export const getURL = (): string => {
  return process.env.BACKEND_URL || "http://0.0.0.0:3000/v1/";
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
    request.url = `${request.url}${paramString ? `?${paramString}` : ""}`;
    request.data = undefined;
  }
  /**
   * Add Authorization header for further requests
   */
  request.headers = {
    ...request.headers,
    [AUTHENTICATION_COOKIE]: getUUID(),
  };

  return request;
};

const errorHandler = (err: any) => {
  /* Not yet implement this */
};

instance.interceptors.request.use(requestHandler, errorHandler);

export default instance;
