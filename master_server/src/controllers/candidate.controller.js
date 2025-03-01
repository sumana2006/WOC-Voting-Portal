/**
 * @params
 * id, name, contact, position, verifiedByStudent, verifiedByStaff
 */

import { POSITIONS } from "../constants/positions.js";
import { Candidate } from "../models/Candidate.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { formatResponse } from "../utils/formatApiResponse.js";

export const handleCandidateRegistration = async (req, res) => {
    const { id, name, contact, position, biometric, verifiedByStudent, verifiedByStaff } = req.body;

    try {
        const encryptedRightThumb = encryptData(biometric.right);
        const encryptedLeftThumb = encryptData(biometric.left);

        const candidateExists = await Candidate.findOne({
            where: {
                id: id,
            }
        })

        if (candidateExists) {
            return res.status(409).json(formatResponse(false, null, 409, "Candidate already registered"));
        }

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

        const ecVolunteer = await EC_Volunteer.findAll();
        let verifiedVolunteer = null;

        for (const volunteer of ecVolunteer) {
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

        if (!Object.values(POSITIONS).includes(position)) {
            return res.status(400).json(formatResponse(false, null, 400, "Invalid position selected."));
        }

        const candidate = await Candidate.create({
            id: id,
            name: name,
            contact: contact,
            position: position,
            biometric_right: encryptedRightThumb,
            biometric_left: encryptedLeftThumb,
            verfiedByStudent: verifiedVolunteer.id,
            verifiedByStaff: verifiedStaff.id
        })

        return res.status(201).json(formatResponse(true, { message: "Candidate registered successfully", candidate }, null, null));

    } catch (err) {
        console.error("Error during candidate registration:", err);
        return res.status(500).json(formatResponse(false, null, 500, err.message || "Internal Server Error"));
    }
}

/**
 * Basis:
 * whenever new candidate registers, he will have id++. 
 * After registerations end say there are 4 candidates for a given pos, the "basis" will be 
 * 0 0 0 1 for candidate with id 1
 * 0 0 1 0 for id 2
 * 0 1 0 0 for id 3
 * 1 0 0 0 for id 4 
 * We may change the corresponding basis to id maps 
 * After registeration process is complete, the "calculateBasis" function is called [make function in imdex.js]
 * 
 */