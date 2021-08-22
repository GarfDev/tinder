import express from "express";
import authHandler from "~middlewares/auth";
import { getPeoples } from "~resources/users";

const router = express.Router();

router.use(authHandler);

router.get("/", getPeoples);

export default router;
