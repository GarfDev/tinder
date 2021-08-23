import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import { Seeder } from "mongo-seeding";
import Config from "~config";
import createLocaleMiddleware from "express-locale";
import userCollection from "~seeds/users";
import router from "~routes";

export default async () => {
  const app = express();

  const port = process.env.PORT;
  const mongo_url = process.env.MONGO_URL;
  const locale = createLocaleMiddleware(Config.locale);

  if (!port) {
    throw Error("Cannot start since PORT env not defined");
  }

  if (!mongo_url) {
    throw Error("Cannot start since MONGO_URL env not defined");
  }

  await mongoose.connect(mongo_url, Config.mongoose);

  const seeder = new Seeder(Config.seeding);
  await seeder.import([userCollection]);

  /**
   * Metadata parser
   */

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(locale);

  /**
   * Body Parser
   */

  app.use(express.json());

  /**
   * Route Initalize
   */

  app.use(router);

  try {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (e) {
    console.log("Error while starting application", e);
  }
};
