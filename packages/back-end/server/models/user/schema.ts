import { Schema } from "mongoose";
import { IUser, IUserLocation } from "./types";
import { mongoosePagination } from "mongoose-paginate-ts";

export const LocationSchema = new Schema<IUserLocation>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  timezone: { type: String, required: true },
});

export const UserSchema = new Schema<IUser>({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  registerDate: { type: String, required: true },
  updatedDate: { type: String, required: true },
  likedUUIDs: { type: [String], required: true },
  passedUUIDs: { type: [String], required: true },
});
UserSchema.plugin(mongoosePagination);
