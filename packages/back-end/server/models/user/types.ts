import { Document } from "mongoose";
import { PersonDetail, PersonLocation } from "@tinder/shared-types";

/**
 * Reuse PersonDetail shared type and extends it with
 * mongoose document
 */

type excludedFields = "registerDate" | "dateOfBirth" | "updatedDate";
export interface IPersonDetail extends Omit<PersonDetail, excludedFields> {
  dateOfBirth: Date;
  registerDate: Date;
  updatedDate: Date;
}

export type IUser = IPersonDetail & Document;

export type IUserLocation = PersonLocation & Document;
