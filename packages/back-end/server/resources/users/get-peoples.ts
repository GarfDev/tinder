import User from "~models/user";
import { IPersonDetail } from "~models/user/types";

const getPeoples = async (user: IPersonDetail) => {
  // Not to let user swipe the same person twice
  const excludeIds = [...user.passedUUIDs, ...user.likedUUIDs];

  const peoples = await User.paginate({
    uuid: {
      $nin: excludeIds,
    },
  });

  if (!peoples) return [];
  console.log(peoples);
  // return peoples.docs.map((people) => people.toJSON());
  return [];
};

export default getPeoples;
