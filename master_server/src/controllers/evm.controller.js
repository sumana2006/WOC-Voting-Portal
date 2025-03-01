import EVM from "../models/EVM.js";
import { EC_Staff } from "../models/EC_Staff.js";
import { encryptData, decryptData } from "../utils/crypto.utils.js";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { formatResponse } from "../utils/formatApiResponse.js";

/**
 * Checks if the given port is open on the provided IP.
 */
const isPortOpen = (ip, port) => {
    return new Promise((resolve) => {
        exec(`nc -z -w2 ${ip} ${port}`, (error) => {
            resolve(!error);
        });
    });
};

/**
 * Registers an EVM
 * Steps:
 * 1. Extract IP from request.
 * 2. Ping the given port to check if it's active.
 * 3. Verify biometric data of EC_Staff.
 * 4. Generate EVM ID.
 * 5. Save EVM record.
 */
export const handleEvmRegistration = async (req, res) => {
    const { room, port, verifiedByStaff, biometric } = req.body;
    const ip = req.ip; // Extract IP from request

    if (!room || !port || !verifiedByStaff || !biometric) {
        return res.status(400).json(formatResponse(false, null, 400, "Missing required fields."));
    }

    // Ping the EVM at the given IP and port
    const portIsOpen = await isPortOpen(ip, port);
    if (!portIsOpen) {
        return res.status(400).json(formatResponse(false, null, 400, "EVM port is not open or not responding."));
    }

    try {
        // Find staff and verify biometric
        const staff = await EC_Staff.findOne({ where: { id: verifiedByStaff } });

        if (!staff) {
            return res.status(404).json(formatResponse(false, null, 404, "Staff not found for verification."));
        }

        const decryptedRight = decryptData(staff.biometric_right);
        const decryptedLeft = decryptData(staff.biometric_left);

        if (decryptedRight !== biometric.right && decryptedLeft !== biometric.left) {
            return res.status(403).json(formatResponse(false, null, 403, "Biometric verification failed."));
        }

        // Generate EVM ID
        const evmId = uuidv4(); // [No uniqueness check yet]

        // Store in database
        await EVM.create({
            id: evmId,
            room,
            ip,
            port,
            health: 100, // Default health status
            verifiedByStaff,
        });

        return res.status(201).json(formatResponse(true, { evmId, message: "EVM registered successfully" }, null, null));

    } catch (err) {
        console.error("Error registering EVM:", err);
        return res.status(500).json(formatResponse(false, null, 500, "Internal Server Error"));
    }
};
