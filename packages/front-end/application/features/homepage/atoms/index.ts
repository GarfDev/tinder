import { axios } from "../../../utils";
import { atom, selector } from "recoil";
import { PersonResponse, PeopleFetchProperities, IPerson } from "../types";
import personRemoteAdapter from "../adapters";
import { API_REQUEST } from "../constants";

/**
 * Atoms
 */

export const peopleFetchProperitiesState = atom<PeopleFetchProperities>({
  key: "peopleFetchProperities",
  default: {
    limit: 10,
    page: 1,
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
      ...API_REQUEST.USERS,
      data: properities,
    });

    return {
      [response.data.page]: response.data.data.map(
        (item) => personRemoteAdapter(item) as IPerson
      ),
    };
  },
});
