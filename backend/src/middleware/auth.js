import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RevokedToken from "../models/revokedToken.js";

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check whether token has been revoked
        const isRevoked = await RevokedToken.findOne({
            jti: decoded.jti
        });

        if (isRevoked) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again."
            });
        }

        // Find authenticated user
        const user = await User.findById(decoded.userId)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        req.token = decoded;

        return next();

    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

export default authenticateUser;