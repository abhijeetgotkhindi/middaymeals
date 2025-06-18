import { pool, writeLog } from "../config/db.js";

export const dashboardValues = async (datavalues) => {
    // const { ngocode, startdate, enddate, ngo, school } = datavalues;
    const [sday, smonth, syear] = datavalues.startdate.split("-");
    const [eday, emonth, eyear] = datavalues.enddate.split("-");
    const enddate = eyear + '-' + emonth + '-' + eday;
    const startdate = syear + '-' + smonth + '-' + sday;

    try {
        //AND ngo IN (?) AND school IN (?)
        const [dashboardValues] = await pool.query(`SELECT IFNULL(count(i.oid), 0) as nofomeals,
        IFNULL(SUM(CASE when i.istatus = 1 then 1 else 0 end), 0) as created, 
        IFNULL(SUM(CASE when i.istatus = 2 then 1 else 0 end), 0) as delivered,
        IFNULL(SUM(CASE when i.istatus = 3 then 1 else 0 end), 0) as received,
        IFNULL(sum(i.milk), 0) as milk, IFNULL(sum(i.rice), 0) as rice, IFNULL(sum(i.sambar), 0) as sambar, IFNULL(sum(i.egg), 0) as egg, IFNULL(sum(i.shengachikki), 0) as shengachikki, IFNULL(sum(i.banana), 0) as banana, IFNULL(sum(i.total), 0) as total  
        FROM `+ datavalues.ngocode + `_intent i INNER JOIN school s ON (i.school = s.oid)
        WHERE i.status = 1 AND s.ngo IN (?) AND i.school IN (?) AND intentfor BETWEEN ? AND ? ;`, [datavalues.ngo.split(','), (datavalues.school).split(','), startdate, enddate]);
        if (dashboardValues.length === 0) {
            return { success: true, message: 'Data not found', dashboardValues: [] };
        }
        return {
            success: true, message: 'Data fetched successful', dashboardValues: dashboardValues
        };
    } catch (error) {
        writeLog(error);
        console.log(error)
        return { success: false, message: 'Failed. Please try again later.' };
    }
};
