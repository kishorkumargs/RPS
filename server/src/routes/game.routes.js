import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { finishGame } from "../controllers/game.controllers.js";

const router = express.Router();

router.post("/finish", authMiddleware, finishGame);

export default router;