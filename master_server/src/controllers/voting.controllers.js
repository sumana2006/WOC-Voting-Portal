import { Voter } from "../models/Voter.js";
import { Commitment } from "../models/Commitments.js"
import { decryptData, encryptForEVM } from "../utils/crypto.utils.js";
import { fetchCandidateInfo } from "../utils/candidate.utils.js";
import jwt from "jsonwebtoken"

// validate user, send session key [controller]
/**@master_server */
/** 
 * decrypt
 * take voter data {voterId, biometric_left, biometric_right}
 * validate data with db
 * * find voter
 * * validate verifiedByVolunteer and verifiedByStaff (all the way to admin)
 * * compare and validate biometrics
 * create random session key (JWT)
 * encrypt with recieved evmId
 * respond with encryption to the frontend
 */

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

        const sessionToken = jwt.sign({ voterId }, process.env.JWT_SECRET, { expiresIn: "1m" });
        const candidateInformation = await fetchCandidateInfo(voter);

        res.cookie("sessionToken", sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 60000, // 1 minute
        });

        return res.status(200).json({
            message: "Session established",
            candidates: candidateInformation,
        });

    } catch (error) {
        console.error("Error during voter login:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


/** @evm */ // [clientside]
/**
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
    const { voterId } = req; // [middleware]
    const { commitments } = req.decryptedData;

    try {
        for (const vote of commitments) {
            await Commitment.create({
                positionIndex: vote.positionIndex,
                evm: vote.evm,
                commitment: vote.commitment,
            });
        }

        return res.status(200).json({ message: "Vote cast successfully" });
    } catch (error) {
        console.error("Error during vote casting:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

