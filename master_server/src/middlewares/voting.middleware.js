import jwt from "jsonwebtoken"

export const sessionValidationMW = (req, res, next) => {
    const { sessionToken } = req.cookies;

    if (!sessionToken) {
        return res.status(401).json({ message: "No session token provided" });
    }
    try {
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        req.voterId = decoded.voterId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired session token" });
    }
}