import { atom, selector } from "recoil";
import { axios } from "../../../../utils";
import { API_REQUEST } from "../constants";
import { InsightResponse } from "../types";

export const navigateUpdateState = atom({
  key: "forceNavigation",
  default: 0,
});

export const insightQuery = selector({
  key: "insightQuery",
  get: async ({ get }) => {
    /**
     * Register this as a dep
     * so selector will re-fetch when
     * deps change
     */
    get(navigateUpdateState);

    const response: InsightResponse = await axios({
      ...API_REQUEST.USER_INSIGHT,
    });

    return {
      liked: response.data?.liked || 0,
      passed: response.data?.passed || 0,
    };
  },
});
