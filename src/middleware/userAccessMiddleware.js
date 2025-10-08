// Remove this line if it's backend code
// import React from 'react' ❌

// Correct imports for backend middleware
import { pool } from "../config/db.js";
export const verifyUserAccess = async (req, res, next) => {
    try {
        if (!req.session || !req.session.user) {
            if (req.session) req.session.destroy(() => {});
            res.clearCookie('connect.sid');
            return res.redirect('/logout');
        }

        const role = req.session.user.role;
        const currentPath = req.path.replace("/", ""); // More reliable than referer

        const [rows] = await pool.query(`
            SELECT ug.oid FROM user_profile up 
            INNER JOIN usergroup ug ON up.usergroup = ug.oid 
            INNER JOIN pagemaster pm ON FIND_IN_SET(pm.oid, ug.pageaccess) > 0
            WHERE ug.oid = ? AND REPLACE(pm.filename, '.php', '') = ?;
        `, [role, currentPath]);

        if (rows.length > 0) {
            return next();
        }

        req.session.destroy(() => {});
        res.clearCookie('connect.sid');
        return res.redirect('/logout');

    } catch (error) {
        console.error("Error in verifyUserAccess middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
};
