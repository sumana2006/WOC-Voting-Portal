import { Voter } from "../models/Voter.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { EC_Volunteer } from "../models/EC_Volunteer.js";
import { encryptData, decryptData } from "../utils/crypto.utils.js";


export const handleVoterRegistration = async (req, res) => {
    const { voterId, name, biometric, verifiedByStudent, verifiedByStaff } = req.body;

    try {
        const encryptedRightThumb = encryptData(biometric.right);
        const encryptedLeftThumb = encryptData(biometric.left);

        const voterExist = await Voter.findOne({
            where: {
                voterId: voterId,
            }
        })

        if (voterExist) {
            return res.status(409).json({ message: 'Voter already exists' });
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
            return res.status(404).json({ message: 'Staff not found for verification.' });
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
            return res.status(404).json({ message: 'Volunteer not found for verification.' });
        }

        const voter = await Voter.create({
            voterId: voterId,
            name: name,
            biometric_right: encryptedRightThumb,
            biometric_left: encryptedLeftThumb,
            verfiedByStudent: verifiedVolunteer.id,
            verifiedByStaff: verifiedStaff.id
        });

        return res.status(201).json({ message: 'Voter created successfully', voter });
    } catch (err) {
        console.error("Error during voter registration:", err);
        return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
}