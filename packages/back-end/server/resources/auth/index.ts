import User from "~models/user";

export const getUserFromUUID = async (uuid: string) => {
  const response = await User.find({ uuid });
  return response;
};
