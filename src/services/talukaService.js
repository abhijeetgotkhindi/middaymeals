import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const talukaList = async () => {
    try {
        const [taluka] = await pool.query('SELECT t.oid, t.talukaname, d.districtname as districtname,district FROM taluka t inner join district d on (d.oid = t.district) where t.status = 1;');
        if (taluka.length === 0) {
            return { success: true, message: 'Data not found', taluka: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            taluka: taluka
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const talukaListByIDList = async (talukaoid) => {
    try {
        const [taluka] = await pool.query('SELECT * FROM taluka WHERE status = 1 AND oid IN (?)', [talukaoid.split(',')]);
        if (taluka.length === 0) {
            return { success: true, message: 'Data not found', taluka: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            taluka: taluka
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertTaluka = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO taluka (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateTaluka = async (datavalues) => {
    const { talukaname, district, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update taluka set talukaname = ?, district = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [talukaname, district, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteTaluka = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE taluka SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
