import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const intentList = async (ngooid) => {
    try {
        const [intent] = await pool.query(`SELECT  i.oid as intentrow,i.oid,DATE_FORMAT(intentfor,'%a %d-%m-%Y') AS intentfor,schoolname , school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total,m.value2 as istatus,DATE_FORMAT(i.creationtime,'%h:%i %p') as creationtime,m.value FROM ` + ngooid + `_intent i
            INNER JOIN school s on (i.school = s.oid) 
            INNER JOIN mastersettings m ON (i.istatus = m.value and type = 'intentstatus')
            WHERE i.status = 1 AND i.status != 0 ORDER BY istatus,intentfor desc`);
        if (intent.length === 0) {
            return { success: true, message: 'Data not found', intent: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            intent: intent
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertIntent = async (datavalues, ngooid) => {
    try {
        datavalues["uuid"] = uuidv6();
        // console.log(datavalues);
        // return false;
        const [results] = await pool.query("INSERT INTO " + ngooid + "_intent (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateIntent = async (datavalues, ngooid) => {
    const { intentfor, school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total, istatus, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update " + ngooid + "_intent set intentfor = ?, school = ?, totalreg = ?, totalpresent = ?, milk = ?, rice = ?, sambar = ?, egg = ?, shengachikki = ?, banana = ?, total = ?, istatus = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [intentfor, school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total, istatus, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateIntentStatus = async (datavalues, ngooid) => {
    const { istatus, createdby, oid } = datavalues;
    const oids = oid.split(',').map(id => id.trim()); // ["7", "5"]
    try {
        const [results] = await pool.query("update " + ngooid + "_intent set istatus = ?, updatedby = ?, updatedtime = NOW() where oid IN (?);", [istatus, createdby, oids]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteIntent = async (oid, ngooid) => {
    try {
        const [results] = await pool.query("UPDATE " + ngooid + "_intent SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
