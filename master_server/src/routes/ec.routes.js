import express from "express";
import { handleEcStaffRegistration, handleEcVolunteerRegistration} from "../controllers/ec.controller.js";

const router = express.Router();

router.post("/register/staff", handleEcStaffRegistration);
router.post("/register/volunteer", handleEcVolunteerRegistration);

export default router;