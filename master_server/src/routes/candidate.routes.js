import express from "express";
import { handleCandidateRegistration } from "../controllers/candidate.controller.js";

const router = express.Router();

router.post("/register", handleCandidateRegistration);

export default router;
