import { RequestHandler } from "express";
import httpStatus from "http-status";
import unsplash from "~utils/unslash";

const getRandomPerson: RequestHandler = async (req, res) => {
  /**
   * Image query params
   */
  const imageQuality = (req.query?.quality as string) || "regular";

  /** Cause conflict of the API so leave the modify type of
   * this library later, just null check for now
   */
  const randomPerson = (await unsplash.photos.getRandom({
    query: "person",
    count: 1,
  })) as unknown as any;
  if (!randomPerson?.response?.[0]) {
    return res.status(httpStatus.NOT_FOUND).send();
  }

  const randomImage = randomPerson.response[0].urls[imageQuality];
  return res.redirect(randomImage);
};

export default getRandomPerson;
