import express from "express";
import { handleVoterRegistration } from "../controllers/voter.controller.js";

const router = express.Router();

router.post("/register", handleVoterRegistration);


export default router;