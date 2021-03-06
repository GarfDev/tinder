import express from "express";
import authHandler from "~middlewares/auth";
import {
  getPeoples,
  likePeoples,
  getUserInisght,
  passPeople,
} from "~resources/users";

const router = express.Router();

router.use(authHandler);

router.get("/", getPeoples);
router.get("/insight", getUserInisght);
router.post("/like", likePeoples);
router.post("/pass", passPeople);

export default router;
