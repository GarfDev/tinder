import httpStatus from "http-status";
import { RequestHandler } from "express";
import normalizeUser from "./normalize-user";
import User from "~models/user";

const getPeoples: RequestHandler = async (req, res) => {
  const user = req.currentUser;
  const currentPage = req.query?.page || 1;

  // Not to let user swipe the same person twice
  const excludeIds = [...user.passedUUIDs, ...user.likedUUIDs];

  const peoples = await User.paginate({
    query: {
      uuid: {
        $nin: excludeIds,
      },
    },
    page: currentPage,
    limit: 10,
  });

  if (peoples) {
    const data = peoples.docs.map((people) => normalizeUser(people));
    return res
      .status(httpStatus.OK)
      .json({ data, page: currentPage, totalPage: peoples.totalPages });
  }

  return res
    .status(httpStatus.OK)
    .json({ data: [], page: currentPage, totalPage: 0 });
};

export default getPeoples;
