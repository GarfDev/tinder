import { IPersonDetail } from "~models/user/types";

declare global {
  namespace Express {
    interface Request {
      currentUser: IPersonDetail;
    }
  }
}
