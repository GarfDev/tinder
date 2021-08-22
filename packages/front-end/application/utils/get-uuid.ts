import cookie from "js-cookie";
import { nanoid } from "nanoid";
import { AUTHENTICATION_COOKIE } from "@tinder/shared-types";

/**
 * This function will generate or return the generated uuid that
 * store in browser cookie.
 * @returns UUID
 */
const getUUID = (): string => {
  const previousUUID = cookie.get(AUTHENTICATION_COOKIE);
  if (previousUUID) return previousUUID;
  const newUUID = nanoid();
  cookie.set(AUTHENTICATION_COOKIE, newUUID);
  return newUUID;
};

export default getUUID;
