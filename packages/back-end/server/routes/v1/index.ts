import express from "express";
import { APPLICATION_ROUTE } from "./constants";

// Internal Resources
import user from "./user";
import images from "./images";

const router = express.Router();

const routes = {
  [APPLICATION_ROUTE.USER]: {
    path: "/users",
    route: user,
  },
  [APPLICATION_ROUTE.IMAGE]: {
    path: "/images",
    route: images,
  },
};

Object.keys(routes).forEach((key) => {
  const route = routes[key as APPLICATION_ROUTE];
  router.use(route.path, route.route);
});

export default router;
