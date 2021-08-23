import { RequestHandler } from "express";
import httpStatus from "http-status";

const getUserInisght: RequestHandler = async (req, res) => {
  const currentUser = req.currentUser;
  return res.status(httpStatus.OK).send({
    liked: currentUser.likedUUIDs.length,
    passed: currentUser.passedUUIDs.length,
  });
};

export default getUserInisght;
