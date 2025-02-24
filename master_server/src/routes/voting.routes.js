import express from "express";
import { decryptMiddleware } from "../middlewares/decryption.middleware";

const router = express.Router();

// router.get("/eligible-positions", voterAuthentication, getEligibleCandidates);
// router.post("/voter-commitment", voterAuthentication, storingCommitment);

router.post('/login', decryptMiddleware, handleVoterSession);

export default router;