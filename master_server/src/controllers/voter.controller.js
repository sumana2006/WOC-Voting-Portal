import { Voter } from "../models/Voter.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { encryptData, decryptData } from "../utils/crypto.utils.js";
import { formatResponse } from "../utils/formatApiResponse.js";

export const handleVoterRegistration = async (req, res) => {
    const { voterId, name, biometric, verifiedByStudent, verifiedByStaff } = req.body;

    if (!voterId || !name || !biometric || !verifiedByStudent || !verifiedByStaff) {
        return res.status(400).json(formatResponse(false, null, 400, "Missing required fields."));
    }

    try {
        const encryptedRightThumb = encryptData(biometric.right);
        const encryptedLeftThumb = encryptData(biometric.left);

        // Check if voter already exists
        const voterExist = await Voter.findOne({ where: { voterId } });

        if (voterExist) {
            return res.status(409).json(formatResponse(false, null, 409, "Voter already exists."));
        }

        // Verify EC Staff biometric
        const staffMembers = await EC_Staff.findAll();
        let verifiedStaff = null;

        for (const staff of staffMembers) {
            const decryptedStaffRight = decryptData(staff.biometric_right);
            const decryptedStaffLeft = decryptData(staff.biometric_left);

            if (decryptedStaffRight === verifiedByStaff || decryptedStaffLeft === verifiedByStaff) {
                verifiedStaff = staff;
                break;
            }
        }

        if (!verifiedStaff) {
            return res.status(404).json(formatResponse(false, null, 404, "Staff not found for verification."));
        }

        // Verify EC Volunteer biometric
        const ecVolunteers = await EC_Volunteer.findAll();
        let verifiedVolunteer = null;

        for (const volunteer of ecVolunteers) {
            const decryptedVolunteerRight = decryptData(volunteer.biometric_right);
            const decryptedVolunteerLeft = decryptData(volunteer.biometric_left);

            if (decryptedVolunteerRight === verifiedByStudent || decryptedVolunteerLeft === verifiedByStudent) {
                verifiedVolunteer = volunteer;
                break;
            }
        }

        if (!verifiedVolunteer) {
            return res.status(404).json(formatResponse(false, null, 404, "Volunteer not found for verification."));
        }

        // Register voter
        const voter = await Voter.create({
            voterId,
            name,
            biometric_right: encryptedRightThumb,
            biometric_left: encryptedLeftThumb,
            verifiedByStudent: verifiedVolunteer.id,
            verifiedByStaff: verifiedStaff.id,
        });

        return res.status(201).json(formatResponse(true, { message: "Voter registered successfully", voter }, null, null));

    } catch (err) {
        console.error("Error during voter registration:", err);
        return res.status(500).json(formatResponse(false, null, 500, "Internal Server Error"));
    }
};
