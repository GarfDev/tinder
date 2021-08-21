import { AxiosResponse } from "axios";
import { Person } from "@tinder/shared-types";

export interface PersonResponse extends AxiosResponse {
  data: {
    data: Person[];
    limit: number;
    total: number;
    page: number;
  };
}

export interface PeopleMap {
  [page: number]: Person[];
}

export * from "@tinder/shared-types";
