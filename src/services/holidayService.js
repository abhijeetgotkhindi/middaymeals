import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const holidayList = async () => {
    try {
        const [holiday] = await pool.query(`SELECT h.oid,DATE_FORMAT(h.holidaydate,'%a %d-%m-%Y') AS holidaydate,DATE_FORMAT(h.holidaydate,'%Y-%m-%d') as holidays,h.holidaydescription, h.kholidaydescription,h.school, GROUP_CONCAT(DISTINCT s.schoolname) as schoolname FROM holidaymaster h
INNER JOIN school s on FIND_IN_SET(s.oid,h.school)
WHERE h.status = 1
GROUP BY h.oid;`);
        if (holiday.length === 0) {
            return { success: true, message: 'Data not found', holiday: [] };
        }
        return { success: true, message: 'Data fetched successful', holiday: holiday };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const schoolholidayList = async (schooloid) => {
    try {
        const [holiday] = await pool.query(`SELECT h.oid,DATE_FORMAT(h.holidaydate,'%a %d-%m-%Y') AS holidaydate,DATE_FORMAT(h.holidaydate,'%Y-%m-%d') as holidays,h.holidaydescription, h.kholidaydescription,h.school, GROUP_CONCAT(DISTINCT s.schoolname) as schoolname FROM holidaymaster h
inner join school s on FIND_IN_SET(s.oid,h.school)
WHERE h.status = 1 AND s.oid IN (?)
group by h.oid;`,[schooloid.split(',')]);
        if (holiday.length === 0) {
            return { success: true, message: 'Data not found', holiday: [] };
        }
        return { success: true, message: 'Data fetched successful', holiday: holiday };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertHoliday = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO holidaymaster (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Holiday Added Successfully" };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateHoliday = async (datavalues) => {
    const { holidaydate, holidaydescription, kholidaydescription, school, createdby, oid } = datavalues;
    try {
        const [results] = await pool.query("update holidaymaster set holidaydate = ?, holidaydescription = ?,kholidaydescription = ?,school = ?,updatedby = ?, updatedtime = NOW() where oid = ?;", [holidaydate, holidaydescription, kholidaydescription, school, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteHoliday = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE holidaymaster SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
