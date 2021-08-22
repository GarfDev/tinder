import { axios } from "../../../utils";
import { atom, selector } from "recoil";
import { PersonResponse, PeopleFetchProperities } from "../types";

/**
 * Atoms
 */

export const peopleFetchProperitiesState = atom<PeopleFetchProperities>({
  key: "peopleFetchProperities",
  default: {
    limit: 10,
    page: 0,
  },
});

/**
 * Selectors
 */

export const peopleQuery = selector({
  key: "getPeoples",
  get: async ({ get }) => {
    const properities = get(peopleFetchProperitiesState);
    const response: PersonResponse = await axios({
      method: "GET",
      url: "/user",
      headers: {
        "app-id": "6120eda966daca73ad7534e4",
      },
      data: properities,
    });

    return { [response.data.page]: response.data.data };
  },
});
