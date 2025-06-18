import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const districtList = async () => {
    try {
        const [district] = await pool.query('SELECT oid,districtname FROM district WHERE status = 1');
        if (district.length === 0) {
            return { success: true, message: 'Data not found', district: [] };
        }
        return { success: true, message: 'Data fetched successful', district: district };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const getDistrictById = async (districtoid) => {
    try {
        const [district] = await pool.query('SELECT oid,districtname FROM district WHERE status = 1 AND oid IN (?)', [districtoid.split(',')]);
        if (district.length === 0) {
            return { success: true, message: 'Data not found', district: [] };
        }
        return { success: true, message: 'Data fetched successful', district: district };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertDistrict = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO district (" + Object.keys(datavalues) + ") VALUES(?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "District Added Successfully" };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateDistrict = async (datavalues) => {
    const { districtname, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update district set districtname = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [districtname, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteDistrict = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE district SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
