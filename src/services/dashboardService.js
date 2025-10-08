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
            i.oid as intentrow,i.oid,DATE_FORMAT(intentfor,'%a %d-%m-%Y') AS intentfor,schoolname , school
            , g1totalreg, g1totalpresent, g1milk, g1hotmeals, g1egg, g1banana, g1total
            , g2totalreg, g2totalpresent, g2milk, g2hotmeals, g2egg, g2banana, g2total
            , g3totalreg, g3totalpresent, g3milk, g3hotmeals, g3egg, g3banana, g3total
            , g4totalreg, g4totalpresent, g4milk, g4hotmeals, g4egg, g4banana, g4total
            ,(g1totalpresent+g2totalpresent+g3totalpresent+g4totalpresent) as totalpresent
            ,(g1totalreg+g2totalreg+g3totalreg+g4totalreg) as totalreg            
            ,(g1hotmeals+g2hotmeals+g3hotmeals+g4hotmeals) as hotmeals
            ,(g1milk+g2milk+g3milk+g4milk) as milk
            ,(g1egg+g2egg+g3egg+g4egg) as egg
            ,(g1banana+g2banana+g3banana+g4banana) as banana 
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
