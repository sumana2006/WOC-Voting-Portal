import express from "express";
import { handleEvmRegistration } from "../controllers/evm.controller.js";

const router = express.Router();

router.post("/register", handleEvmRegistration);

export default router;