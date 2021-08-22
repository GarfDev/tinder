import dotenv from "dotenv";

dotenv.config();
export default {
  database: process.env.MONGO_URL,
  dropDatabase: true,
};
