import { RequestHandler } from "express";
import httpStatus from "http-status";
import User from "~models/user";

interface LikePeopleBody {
  uuid?: string;
}

const passPeople: RequestHandler = async (req, res) => {
  const body: LikePeopleBody = req.body;
  if (body.uuid) {
    const user = await User.findOneAndUpdate(
      { uuid: req.currentUser.uuid },
      { $push: { passedUUIDs: body.uuid } },
      { new: true }
    );
    return res.status(httpStatus.ACCEPTED).send(user!.toJSON());
  }
  return res.status(httpStatus.NON_AUTHORITATIVE_INFORMATION).send();
};

export default passPeople;
