import express from "express";
import { handleCandidateRegistration } from "../controllers/candidate_registration.controller.js";

const router = express.Router();


router.post("/candidate_registration", handleCandidateRegistration);

export default router;
