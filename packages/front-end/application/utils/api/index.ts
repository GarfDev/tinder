import axios, { AxiosRequestConfig } from "axios";
import { URLSearchParams } from "url";

const instance = axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
  responseType: "json",
});

const requestHandler = (request: AxiosRequestConfig) => {
  /**
   * Automatic transform data to url params for get requests
   */
  if (request.method?.toLowerCase() === "get") {
    const paramString = new URLSearchParams(request.data).toString();
    request.url = `${request.url}?${paramString}`;
    request.data = undefined;
  }
  return request;
};

const errorHandler = (err: any) => {};

instance.interceptors.request.use(requestHandler, errorHandler);

export default instance;
