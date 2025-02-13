import express from "express";
import { handleEcStaffRegistration, handleEcVolunteerRegistration} from "../controllers/ec_registration.controller.js";

const router = express.Router();

router.post("/ec_staff", handleEcStaffRegistration);
router.post("/ec_volunteer", handleEcVolunteerRegistration);

export default router;