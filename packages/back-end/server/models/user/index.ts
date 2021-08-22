import { model } from "mongoose";
import { Pagination } from "mongoose-paginate-ts";
import { UserSchema } from "./schema";
import { IUser } from "./types";

const User = model("User", UserSchema) as Pagination<IUser>;

export default User;
