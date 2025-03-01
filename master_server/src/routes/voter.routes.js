import express from "express";
import { handleVoterRegistration} from "../controllers/voter_registration.controller.js";

const router = express.Router();

router.post("/register", handleVoterRegistration);


export default router;