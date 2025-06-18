import { pool, writeLog } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const schoolList = async () => {
    try {
        const [schools] = await pool.query('SELECT oid,ngo,schoolcode,schoolname,kschoolname,addressline1,addressline2,village,taluka,district,pincode,contactno,headmastername,headmasteremail,headmasterno,1std,2std,3std,4std,5std,6std,7std,8std,9std,10std,1std_female,2std_female,3std_female,4std_female,5std_female,6std_female,7std_female,8std_female,9std_female,10std_female,1std_male,2std_male,3std_male,4std_male,5std_male,6std_male,7std_male,8std_male,9std_male,10std_male FROM school WHERE status = 1');
        if (schools.length === 0) {
            return { success: true, message: 'Data not found', schools: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            schools: schools
        };
    } catch (error) {       
        writeLog(error);
        console.error("Error:", error);
        return { success: false, message: error.sqlMessage };
    }
};

export const getSchoolById = async (schooloid) => {
    try {
        const [schools] = await pool.query('SELECT oid,ngo,schoolcode,schoolname,kschoolname,addressline1,addressline2,village,taluka,district,pincode,contactno,headmastername,headmasteremail,headmasterno,1std,2std,3std,4std,5std,6std,7std,8std,9std,10std,1std_female,2std_female,3std_female,4std_female,5std_female,6std_female,7std_female,8std_female,9std_female,10std_female,1std_male,2std_male,3std_male,4std_male,5std_male,6std_male,7std_male,8std_male,9std_male,10std_male FROM school WHERE status = 1 AND oid IN (?)', [schooloid.split(',')]);
        if (schools.length === 0) {
            return { success: true, message: 'Data not found', schools: [] };
        }
        return { success: true, message: 'Data fetched successful', schools: schools };
    } catch (error) {       
        writeLog(error);
        return { success: false, message: error.sqlMessage };
    }
};

export const ngoSchoolList = async (ngooid) => {
    const { oid } = ngooid;
    try {
        const [schools] = await pool.query('select oid,ngo,schoolcode,schoolname,kschoolname,addressline1,addressline2,village,taluka,district,pincode,contactno,headmastername,headmasteremail,headmasterno,1std,2std,3std,4std,5std,6std,7std,8std,9std,10std,1std_female,2std_female,3std_female,4std_female,5std_female,6std_female,7std_female,8std_female,9std_female,10std_female,1std_male,2std_male,3std_male,4std_male,5std_male,6std_male,7std_male,8std_male,9std_male,10std_male from school where status = 1 AND ngo IN (?)', [oid]);
        if (schools.length === 0) {
            return { success: true, message: 'Data not found', schools: [] };
        }
        return { success: true, message: 'Data fetched successful', schools: schools };

    } catch (error) {       
        writeLog(error);
        return { success: false, message: error.sqlMessage };

    }
};

export const insertSchool = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO school (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {       
        writeLog(error);
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateSchool = async (datavalues) => {
    try {
        const [results] = await pool.query("UPDATE school  SET ngo = ?, schoolcode = ?,  schoolname = ?, kschoolname = ?, addressline1 = ?, addressline2 = ?, village = ?, taluka = ?, district = ?, pincode = ?, contactno = ?, headmastername = ?, headmasterno = ?, headmasteremail = ?, 1std_female = ?, 1std_male = ?, 1std = ?, 2std_female = ?, 2std_male = ?, 2std = ?, 3std_female = ?, 3std_male = ?, 3std = ?, 4std_female = ?, 4std_male = ?, 4std = ?, 5std_female = ?, 5std_male = ?, 5std = ?, 6std_female = ?, 6std_male = ?, 6std = ?, 7std_female = ?, 7std_male = ?, 7std = ?, 8std_female = ?, 8std_male = ?, 8std = ?, 9std_female = ?, 9std = ?, 10std_female = ?, 10std_male = ?, 10std = ?, updatedBy = ?, updatedtime = NOW() WHERE oid = ?", Object.values(datavalues));
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {        
        writeLog(error);

        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteSchool = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE school SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {       
        writeLog(error);
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
