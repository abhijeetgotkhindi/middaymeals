import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';
import { dashboardValues } from "./dashboardService.js";

export const routeList = async () => {
    try {
        const [route] = await pool.query('SELECT t.oid, t.routename, d.ngoname as ngoname,ngo FROM route t inner join ngo d on (d.oid = t.ngo) where t.status = 1;');
        if (route.length === 0) {
            return { success: true, message: 'Data not found', route: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            route: route
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const routeListByIDList = async (routeoid) => {
    try {
        const [route] = await pool.query('SELECT * FROM route WHERE status = 1 AND oid IN (?)', [routeoid.split(',')]);
        if (route.length === 0) {
            return { success: true, message: 'Data not found', route: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            route: route
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertRoute = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO route (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateRoute = async (datavalues) => {
    const { routename, ngo, updatedBy: createdby, oid } = datavalues;
    // console.log(datavalues);
    // return false;
    try {
        const [results] = await pool.query("update route set routename = ?, ngo = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [routename, ngo, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteRoute = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE route SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
