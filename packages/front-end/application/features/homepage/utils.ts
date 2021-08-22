import { axios } from "../../utils";
import { API_REQUEST } from "./constants";

export const callLikePerson = async (uuid: string) => {
  const response = await axios({
    ...API_REQUEST.LIKE,
    data: { uuid },
  });
  return response.status;
};

export const callPassPerson = async (uuid: string) => {
  const response = await axios({
    ...API_REQUEST.PASS,
    data: { uuid },
  });
  return response.status;
};
