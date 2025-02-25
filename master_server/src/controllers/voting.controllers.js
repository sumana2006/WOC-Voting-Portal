import { Voter } from "../models/Voter.js";
import { Commitment } from "../models/Commitments.js"
import { decryptData, encryptForEVM } from "../utils/crypto.utils.js";
import crypto from "crypto";

// validate user, send session key [controller]
/**@master_server */
/** 
 * decrypt
 * take voter data {voterId, biometric_left, biometric_right}
 * validate data with db
 * * find voter
 * * validate verifiedByVolunteer and verifiedByStaff (all the way to admin)
 * * compare and validate biometrics
 * create random session key
 * store in memory map of voter-session_key
 * start timer for 1 minute (the session key should be deleted exactly after 1 minute)
 * encrypt with recieved evmId
 * respond with encryption to the frontend
 */

const sessionStore = new Map();

export const handleVoterSession = async (req, res) => {
    try {
        const { voterId, biometric_left, biometric_right, evmId } = req.decryptedData;
        const voter = await Voter.findOne({ where: { voterId } });
        if (!voter) {
            return res.status(404).json({ message: "Voter not found" });
        }

        const storedRight = decryptData(voter.biometric_right);
        const storedLeft = decryptData(voter.biometric_left);

        if (storedRight !== biometric_right || storedLeft !== biometric_left) {
            return res.status(401).json({ message: "Biometric validation failed" });
        }

        if (!voter.verfiedByVolunteer || !voter.verifiedByStaff) {
            return res.status(403).json({ message: "Voter has not been fully verified" });
        }

        const sessionKey = crypto.randomBytes(16).toString('hex');

        sessionStore.set(voterId, sessionKey);

        setTimeout(() => {
            sessionStore.delete(voterId);
        }, 60000); // [check]

        const encryptedSessionKey = encryptForEVM(sessionKey, evmId);
        return res.status(200).json({ sessionKey: encryptedSessionKey });

    } catch (error) {
        console.error("Error during voter login:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}

/** @evm */ // [clientside]
/**
 * decrypt
 * store session key in local storage (or alt)
 * send with next message and delete
 */

// cast vote [controller]
/**
 * decrypt
 * validate session key
 * collect and store commitments
 */

export const handleCastVote = async (req, res) => {
    const { voterId, sessionKey, commitments } = req.decryptedData;
    try {
        const storedSessionKey = sessionStore.get(voterId);
        if (!storedSessionKey || storedSessionKey !== sessionKey) {
            return res.status(401).json({ message: "Invalid or expired session key" });
        }

        sessionStore.delete(voterId);

        for (const vote of commitments) { // [check]
            await Commitment.create({
                positionIndex: vote.positionIndex,
                evm: vote.evm,
                commitment: vote.commitment
            });
        }
        return res.status(200).json({ message: "Vote cast successfully" });
    } catch (error) {
        console.error("Error during vote casting:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
