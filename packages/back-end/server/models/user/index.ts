import { model, Model } from "mongoose";
import { UserSchema } from "./schema";
import { IUser } from "./types";

const User: Model<IUser> = model("User", UserSchema);

export default User;
