import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const pagemasterList = async () => {
    try {
        const [pagemaster] = await pool.query("SELECT p1.oid, p1.filename, p1.icon, p1.parent, IFNULL(p2.title,'Main Menu') as parentname, p1.title, p1.title2, p1.sort FROM pagemaster p1 LEFT JOIN pagemaster p2 ON (p1.parent = p2.oid) WHERE p1.status = 1 ORDER BY p1.sort;");
        if (pagemaster.length === 0) {
            return { success: true, message: 'Data not found', pagemaster: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            pagemaster: pagemaster
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const pagemasterListByIDList = async (pagemasteroid) => {
    try {
        const [pagemaster] = await pool.query("SELECT p1.oid, p1.filename, p1.icon, p1.parent, IFNULL(p2.title,'Main Menu') as parentname, p1.title, p1.title2, p1.sort FROM pagemaster p1 LEFT JOIN pagemaster p2 ON (p1.parent = p2.oid) WHERE p1.status = 1 AND p1.oid IN (?)", [pagemasteroid.split(',')]);
        if (pagemaster.length === 0) {
            return { success: true, message: 'Data not found', pagemaster: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            pagemaster: pagemaster
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertPagemaster = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO pagemaster (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updatePagemaster = async (datavalues) => {
    const { filename, icon, parent, sort, title, title2, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update pagemaster set filename = ?, icon = ?, parent = ?, sort = ?, title = ?, title2 = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [filename, icon, parent, sort, title, title2, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deletePagemaster = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE pagemaster SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
