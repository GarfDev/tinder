import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Seeder } from "mongo-seeding";
import seedingConfig from "~config/seeding";
import createLocaleMiddleware from "express-locale";
import authHandler from "~middlewares/auth";
import userCollection from "~seeds/users";

export default async () => {
  const app = express();

  const port = process.env.PORT;
  const mongo_url = process.env.MONGO_URL;

  if (!port) {
    throw Error("Cannot start since PORT env not defined");
  }

  if (!mongo_url) {
    throw Error("Cannot start since MONGO_URL env not defined");
  }

  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const seeder = new Seeder(seedingConfig);
  await seeder.import([userCollection]);

  app.use(cors());
  app.use(express.json());
  app.use(
    createLocaleMiddleware({
      allowed: ["en_US", "pt_BR"],
      default: "en_US",
      priority: ["accept-language", "default"],
    })
  );
  app.use(authHandler);

  app.get("/", (request, response) => {
    response.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};
