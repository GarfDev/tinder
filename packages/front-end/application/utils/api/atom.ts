import { AxiosRequestConfig, AxiosResponse } from "axios";
import { selector } from "recoil";
import { axios } from "~utils";

export const query = <T = any>(config: AxiosRequestConfig) =>
  selector({
    key: "requester",
    get: async () => {
      const response: AxiosResponse<T> = await axios(config);
      return response;
    },
  });
