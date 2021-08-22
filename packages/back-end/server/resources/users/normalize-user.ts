import { PersonDetail } from "@tinder/shared-types";
import { IUser } from "~models/user/types";

const normalizeUser = (user: IUser): PersonDetail => ({
  uuid: user.uuid,
  title: user.title,
  firstName: user.firstName,
  lastName: user.lastName,
  gender: user.gender,
  email: user.email,
  dateOfBirth: user.dateOfBirth.toString(),
  phone: user.phone,
  location: user.location,
  registerDate: user.registerDate.toString(),
  updatedDate: user.updatedDate.toString(),
});

export default normalizeUser;
