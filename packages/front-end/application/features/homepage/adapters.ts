import { PersonDetail } from "@tinder/shared-types";
import calculateAge from "../../utils/calculate-dob";
import { getURL } from "../../utils/api";
import { IPerson } from "./types";

const personRemoteAdapter = (person: PersonDetail): IPerson => {
  return {
    ...person,
    avatarUrl: getURL() + `images/${person.uuid}`,
    age: calculateAge(person.dateOfBirth),
  };
};

export default personRemoteAdapter;
