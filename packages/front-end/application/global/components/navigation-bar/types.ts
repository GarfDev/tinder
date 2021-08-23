import { AxiosResponse } from "axios";

export interface InsightResponse extends AxiosResponse {
  data: {
    liked: number;
    passed: number;
  };
}
