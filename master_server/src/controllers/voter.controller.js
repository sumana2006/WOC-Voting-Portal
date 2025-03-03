import { Voter } from "../models/Voter.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { encryptData, decryptData } from "../utils/crypto.utils.js";
import { formatResponse } from "../utils/formatApiResponse.js";

export const handleVoterRegistration = async (req, res) => {
    const { voterId, name, biometric, verifiedByVolunteer, verifiedByStaff } = req.body;

    if (!voterId || !name || !biometric || !verifiedByVolunteer || !verifiedByStaff) {
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
        const staffProvided = await EC_Staff.findOne({ where: {
            id: verifiedByStaff.id,
        }})

        if(!staffProvided) 
            return res.status(404).json(formatResponse(false, null, 404, "Staff not found"));

        let verifiedStaff = false;

        const decryptedStaffRight = decryptData(staffProvided.biometric_right);
        const decryptedStaffLeft = decryptData(staffProvided.biometric_left)

        if(verifiedByStaff.left === decryptedStaffLeft || verifiedByStaff.right === decryptedStaffRight) {
            verifiedStaff = true;
        }

        if (!verifiedStaff) {
            return res.status(404).json(formatResponse(false, null, 404, "Staff not found for verification."));
        }

        // Verify EC Volunteer biometric
        const volunteerProvided = await EC_Volunteer.findOne({ where: {
            id: verifiedByVolunteer.id,
        }})

        if(!volunteerProvided) 
            return res.status(404).json(formatResponse(false, null, 404, "Volunteer not found"));

        console.log("Vol Prov = ", volunteerProvided);

        let verifiedVolunteer = false;

        const decryptedVolunteerRight = decryptData(volunteerProvided.biometric_right);
        const decryptedVolunteerLeft = decryptData(volunteerProvided.biometric_left)

        if(verifiedByVolunteer.left === decryptedVolunteerLeft || verifiedByVolunteer.right === decryptedVolunteerRight) {
            verifiedVolunteer = true;
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
            verifiedByVolunteer: verifiedByVolunteer.id,
            verifiedByStaff: verifiedByStaff.id,
        });

        return res.status(201).json(formatResponse(true, { message: "Voter registered successfully", voter }, null, null));

    } catch (err) {
        console.error("Error during voter registration:", err);
        return res.status(500).json(formatResponse(false, null, 500, "Internal Server Error"));
    }
};
