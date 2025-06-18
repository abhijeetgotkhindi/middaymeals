import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const villageList = async () => {
    try {
        const [village] = await pool.query('select v.oid,v.villagename,v.taluka,t.talukaname from village v inner join taluka t on (v.taluka = t.oid) where v.status = 1');
        if (village.length === 0) {
            return { success: true, message: 'Data not found', village: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            village: village
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const villageListByIDList = async (villageoid) => {
    try {
        const [village] = await pool.query('select v.oid,v.villagename,v.taluka,t.talukaname from village v inner join taluka t on (v.taluka = t.oid) where v.status = 1 AND oid IN (?)', [villageoid.split(',')]);
        if (village.length === 0) {
            return { success: true, message: 'Data not found', village: [] };
        }
        return { success: true, message: 'Data fetched successful', village: village };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertVillage = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO village (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateVillage = async (datavalues) => {
    const {villagename, taluka, createdby, oid} = datavalues;
    try {
        const [results] = await pool.query("update village set villagename = ?, taluka = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [villagename, taluka, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteVillage = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE village SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
