// services/userService.js
import { pool } from "../config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v6 as uuidv6 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file

// Login User with JWT token
export const loginUser = async (username, password) => {
    try {
        const [rows] = await pool.query(`SELECT u.password, u.oid, u.usergroup, u.username,u. email, u.displayname, u.ngo, u.school, u.village, u.taluka, u.district,n.ngocode FROM user_profile u             
            inner join ngo n on FIND_IN_SET(n.oid,u.ngo)
			inner join school s on FIND_IN_SET(s.oid,u.school)
			inner join district d on FIND_IN_SET(d.oid,u.district)
			inner join taluka t on FIND_IN_SET(t.oid,u.taluka)
			inner join village v on FIND_IN_SET(v.oid,u.village)
            WHERE u.username = ? AND u.status = 1`, [username]);
        if (rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return { success: false, message: 'Incorrect password' };
        }
        delete user['password']//deleting password from object and send to client
        user["session_id"] = uuidv6();
        await pool.query(`UPDATE user_profile SET session_id = ? where oid = ?`, [user.session_id, user.oid]);
        // Generate JWT token
        const token = jwt.sign(
            { user },
            JWT_SECRET,
            { expiresIn: process.env.MAX_AGE / 1000 + 's' }
        );
        return {
            success: true,
            message: 'Login successful',
            token,
            user: user,
        };
    } catch (error) {
        return { success: false, message: 'Login failed. Please try again later.' };
    }
};

export const logoutUser = async (token) => {
    try {
        return {
            success: true,
            message: 'Logout successful'
        };
    } catch (error) {
        return { success: false, message: 'Logout failed. Please try again later.' };
    }
};
