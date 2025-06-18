import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const ngoList = async () => {
    try {
        const [ngos] = await pool.query('SELECT oid, ngoname, kngoname,ngocode,address,contactno,email,representativename,representativeno,areacovered,logo,totalschools FROM ngo WHERE status = 1');
        if (ngos.length === 0) {
            return { success: true, message: 'Data not found', ngos: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            ngos: ngos
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const getNgoById = async (ngooid) => {
    try {
        const [ngos] = await pool.query('select oid, ngoname, kngoname,ngocode,address,contactno,email,representativename,representativeno,areacovered,logo,totalschools FROM ngo where oid IN (?) ', [ngooid.split(',')]);
        if (ngos.length === 0) {
            return { success: true, message: 'Data not found', ngos: [] };
        }
        return { success: true, message: 'Data fetched successful', ngos: ngos };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertNgo = async (datavalues) => {
    const ngocode = (datavalues.ngocode)+"_intent";
    try {
        datavalues["uuid"] = uuidv6();
    // console.log(Object.values(datavalues))
        const [results] = await pool.query("INSERT INTO ngo (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        const [intentTable] = await pool.query("CREATE TABLE "+ngocode+" LIKE intent;");
        return { success: true, message: "NGO Added Successfully" };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateNgo = async (datavalues) => {
    const { ngocode, ngoname, kngoname, address, contactno, email, representativename, representativeno, areacovered, logo, totalschools, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update ngo set ngocode = ?, ngoname = ?, kngoname = ?, address = ?, contactno = ?, email = ?, representativename = ?, representativeno = ?, areacovered = ?, logo = ?, totalschools = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [ngocode, ngoname, kngoname, address, contactno, email, representativename, representativeno, areacovered, logo, totalschools, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteNgo = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE ngo SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
