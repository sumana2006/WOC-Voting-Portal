/**
 * @params
 * id, name, contact, position, verifiedByStudent, verifiedByStaff
 */

import { POSITIONS } from "../constants/positions.js";
import { Candidate } from "../models/Candidate.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { decryptData, encryptData } from "../utils/crypto.utils.js";
import { formatResponse } from "../utils/formatApiResponse.js";

export const handleCandidateRegistration = async (req, res) => {
    const { id, name, contact, position, biometric, verifiedByVolunteer, verifiedByStaff } = req.body;

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
        
                let verifiedVolunteer = false;
        
                const decryptedVolunteerRight = decryptData(volunteerProvided.biometric_right);
                const decryptedVolunteerLeft = decryptData(volunteerProvided.biometric_left)
        
                if(verifiedByVolunteer.left === decryptedVolunteerLeft || verifiedByVolunteer.right === decryptedVolunteerRight) {
                    verifiedVolunteer = true;
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
            verfiedByVolunteer: verifiedByVolunteer.id,
            verifiedByStaff: verifiedByStaff.id
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