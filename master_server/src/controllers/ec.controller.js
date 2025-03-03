import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { encryptData, decryptData } from "../utils/crypto.utils.js";
import { formatResponse } from "../utils/formatApiResponse.js";

// take admin biometrics
export const handleEcStaffRegistration = async (req, res) => {
    const { id, name, biometric } = req.body;
    console.log(req.body)
    try {
        const staffExist = await EC_Staff.findOne({
            where: {
                id: id,
            }
        });

        if (staffExist) {
            return res.status(409).json(formatResponse(false, null, 409, "Staff already exists"));
        }

        const encryptedRightThumb = encryptData(biometric.right);
        const encryptedLeftThumb = encryptData(biometric.left);

        const staff = await EC_Staff.create({
            id: id,
            name: name,
            biometric_right: encryptedRightThumb,
            biometric_left: encryptedLeftThumb
        });

        const staffs = await EC_Staff.findAll();
        console.log(staffs);

        return res.status(201).json(formatResponse(true, { message: "Staff created successfully", staff: staff }, null, null));
    }
    catch (err) {
        console.error("Error during EC Staff registration:", err);
        return res.status(500).json(formatResponse(false, null, 500, err.message || "Internal Server Error"));
    }
}

export const handleEcVolunteerRegistration = async (req, res) => {
    // code here
    const { id, name, contact, biometric, verifiedByStaff } = req.body;

    try {
        // Encrypt the volunteer's biometric data

        const volunteerExist = await EC_Volunteer.findOne({
            where: {
                id: id,
            }
        });

        if (volunteerExist) {
            return res.status(409).json(formatResponse(false, null, 409, "Volunteer already exists"));
        }

        const encryptedRightThumb = encryptData(biometric.right);
        const encryptedLeftThumb = encryptData(biometric.left);

        const staffProvided = await EC_Staff.findOne({
            where: {
                id: verifiedByStaff.id,
            }
        })

        let verifiedStaff = false;

        const decryptedStaffRight = decryptData(staffProvided.biometric_right);
        const decryptedStaffLeft = decryptData(staffProvided.biometric_left)

        if (verifiedByStaff.left === decryptedStaffLeft || verifiedByStaff.right === decryptedStaffRight) {
            verifiedStaff = true;
        }

        // for (const staff of staffMembers) {
        //     const decryptedStaffRight = decryptData(staff.biometric_right);
        //     const decryptedStaffLeft = decryptData(staff.biometric_left);

        //     if (decryptedStaffRight === verifiedByStaff || decryptedStaffLeft === verifiedByStaff) {
        //         verifiedStaff = staff;
        //         break;
        //     }
        // }

        if (!verifiedStaff) {
            return res.status(404).json(formatResponse(false, null, 404, "Staff not found for verification."));
        }

        // Create a new volunteer
        const volunteer = await EC_Volunteer.create({
            id: id,
            name: name,
            contact: contact,
            biometric_right: encryptedRightThumb,
            biometric_left: encryptedLeftThumb,
            verifiedByStaff: verifiedByStaff.id,
        });

        return res.status(201).json(formatResponse(true, { message: "Volunteer created successfully", volunteer }, null, null));
    } catch (err) {
        console.error("Error during EC Volunteer registration:", err);
        return res.status(500).json(formatResponse(false, null, 500, err.message || "Internal Server Error"));
    }
}