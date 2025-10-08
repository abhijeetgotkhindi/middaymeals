import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const verifyToken = async (req, res, next) => {
    // const token = req.cookies?.token;

    // if (!token) {
    //     return res.status(400).json({
    //         status: false,
    //         message: "Not authenticated (no cookie token)",
    //     });
    // }

    const authHeader = req.headers['authorization'];
    const auth_token = authHeader && authHeader.split(' ')[1];
    // const token = auth_token;

    if (!auth_token) {
        return res.status(400).json({
            status: false,
            message: "Not authenticated",
        });
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const { oid, session_id } = decoded.user;
        // ✅ Update session in DB
        const [userdata] = await pool.query(`SELECT session_id FROM user_profile where session_id = ? AND oid = ?`, [session_id, oid]);
        if (userdata[0].session_id != session_id) {
            return res.status(400).json({
                status: false,
                message: "Not authenticated",
            });
        }
        
        const newAccessToken = jwt.sign(
            { user: { oid, session_id } },
            process.env.JWT_SECRET,
            { expiresIn: process.env.MAX_AGE } // reset expiry every request
        );
        // ✅ Set the token again in cookie
        res.cookie('token', newAccessToken, {
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
