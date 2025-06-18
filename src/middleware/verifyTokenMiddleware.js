import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(400).json({
            status: false,
            message: "Not authenticated (no cookie token)",
        });
    }

    const authHeader = req.headers['authorization'];
    const auth_token = authHeader && authHeader.split(' ')[1];

    if (!auth_token) {
        return res.status(400).json({
            status: false,
            message: "Not authenticated",
        });
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Example: decoded might contain { oid: 123, session_id: "abc123" }
        const { oid, session_id } = decoded.user;

        // ✅ Update session in DB
        const [userdata] = await pool.query(`SELECT session_id FROM user_profile where session_id = ? AND oid = ?`, [session_id, oid]);
        if (userdata[0].session_id != session_id) {
            return res.status(400).json({
                status: false,
                message: "Not authenticated",
            });
        }

        // ✅ Set the token again in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // use true in production only if using HTTPS
            sameSite: 'Lax',
            maxAge: parseInt(process.env.MAX_AGE),
        });

        // Pass user info to next middleware (optional)
        // req.user = decoded;

        next();
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: 'Invalid or expired token',
            error: err.message,
        });
    }
};
