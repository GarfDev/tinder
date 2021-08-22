import { Model } from "mongoose";
import { IPersonDetail } from "~models/user/types";
declare global {
  namespace Express {
    interface Request {
      currentUser: IPersonDetail;
    }
  }
}

export interface SeederCollection<T = object> {
  name: string;
  documents: T[];
}
