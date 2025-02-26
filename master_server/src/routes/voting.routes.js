import express from "express";
import { decryptMiddleware } from "../middlewares/decryption.middleware.js";
import { handleCastVote, handleVoterSession } from "../controllers/voting.controllers.js";

const router = express.Router();

// router.get("/eligible-positions", voterAuthentication, getEligibleCandidates);
// router.post("/voter-commitment", voterAuthentication, storingCommitment);

router.post('/login', decryptMiddleware, handleVoterSession);
router.post('/cast', decryptMiddleware, handleCastVote)

export default router;