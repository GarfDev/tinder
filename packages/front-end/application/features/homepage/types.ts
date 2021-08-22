import { AxiosResponse } from "axios";
import { PersonDetail } from "@tinder/shared-types";

export interface IPerson extends PersonDetail {
  age: number;
  avatarUrl: string;
}
export interface PersonResponse extends AxiosResponse {
  data: {
    data: PersonDetail[];
    limit: number;
    total: number;
    page: number;
  };
}

export interface PeopleMap {
  [page: number]: IPerson[];
}

export * from "@tinder/shared-types";
