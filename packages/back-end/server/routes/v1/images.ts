import express from "express";
import { getRandomPerson } from "~resources/images";

const router = express.Router();

router.get("/:userId", getRandomPerson);
router.get("/", getRandomPerson);

export default router;
