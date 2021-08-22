import { IPersonDetail } from "~models/user/types";
import { generateUser } from "~resources/users";
import { SeederCollection } from "~types";

const LIMIT = 1000;
const GENERATED_ARRAY = new Array(LIMIT).fill(0);

const userCollection: SeederCollection<IPersonDetail> = {
  name: "User",
  documents: GENERATED_ARRAY.map(() => {
    return generateUser();
  }),
};

export default userCollection;
