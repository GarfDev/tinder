import { Document } from "mongoose";
import { PersonDetail, PersonLocation } from "@tinder/shared-types";

/**
 * Reuse PersonDetail shared type and extends it with
 * mongoose document
 */
export type IUser = PersonDetail & Document;

export type IUserLocation = PersonLocation & Document;
