import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const usergroupList = async () => {
    try {
        const [usergroup] = await pool.query('SELECT * FROM usergroup WHERE status = 1');
        if (usergroup.length === 0) {
            return { success: false, message: 'Data not found' };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            usergroup: usergroup
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const usergroupListByIDList = async (usergroupoid) => {
    try {
        const [usergroup] = await pool.query('SELECT * FROM usergroup WHERE status = 1 AND oid IN (?)', [usergroupoid.split(',')]);
        if (usergroup.length === 0) {
            return { success: false, message: 'Data not found' };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            usergroup: usergroup
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertUsergroup = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO usergroup (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateUsergroup = async (datavalues) => {
    const { groupname, pageaccess, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update usergroup set groupname = ?, pageaccess = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [groupname, pageaccess, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteUsergroup = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE usergroup SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
