import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const userprofileList = async () => {
    try {
        const [userprofile] = await pool.query(`SELECT
			u.oid as 'oid',u.username ,u.displayname as displayname,u.email as email,u.ngo as ngo,u.school as school,u.district,u.taluka,u.village, u.usergroup,ug.groupname,
			GROUP_CONCAT(DISTINCT n.ngoname) as ngoname,
			GROUP_CONCAT(DISTINCT s.schoolname) as schoolname,
			GROUP_CONCAT(DISTINCT d.districtname) as districtname, 
			GROUP_CONCAT(DISTINCT t.talukaname) as talukaname, 
			GROUP_CONCAT(DISTINCT v.villagename) as villagename
			from user_profile u 
			inner join usergroup ug on (u.usergroup = ug.oid)
			inner join ngo n on FIND_IN_SET(n.oid,u.ngo)
			inner join school s on FIND_IN_SET(s.oid,u.school)
			inner join district d on FIND_IN_SET(d.oid,u.district)
			inner join taluka t on FIND_IN_SET(t.oid,u.taluka)
			inner join village v on FIND_IN_SET(v.oid,u.village)
			where u.status = 1
			group by u.oid;`);
        if (userprofile.length === 0) {
            return { success: true, message: 'Data not found', userprofile: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            userprofile: userprofile
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const userprofileListByIDList = async (userprofileoid) => {
    try {
        const [userprofile] = await pool.query(`SELECT
			u.oid as 'oid',u.username ,u.displayname as displayname,u.email as email,u.ngo as ngo,u.school as school,u.district,u.taluka,u.village, u.usergroup,ug.groupname,
			GROUP_CONCAT(DISTINCT n.ngoname) as ngoname,
			GROUP_CONCAT(DISTINCT s.schoolname) as schoolname,
			GROUP_CONCAT(DISTINCT d.districtname) as districtname, 
			GROUP_CONCAT(DISTINCT t.talukaname) as talukaname, 
			GROUP_CONCAT(DISTINCT v.villagename) as villagename
			from user_profile u 
			inner join usergroup ug on (u.usergroup = ug.oid)
			inner join ngo n on FIND_IN_SET(n.oid,u.ngo)
			inner join school s on FIND_IN_SET(s.oid,u.school)
			inner join district d on FIND_IN_SET(d.oid,u.district)
			inner join taluka t on FIND_IN_SET(t.oid,u.taluka)
			inner join village v on FIND_IN_SET(v.oid,u.village)
			where u.status = 1 AND u.oid IN (?)
			group by u.oid;`, [userprofileoid.split(',')]);
        if (userprofile.length === 0) {
            return { success: true, message: 'Data not found', userprofile: [] };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            userprofile: userprofile
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const insertUserprofile = async (datavalues) => {
    try {
        datavalues["uuid"] = uuidv6();
        const [results] = await pool.query("INSERT INTO user_profile (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateUserprofile = async (datavalues) => {
    const { password, usergroup, username, email, displayname, ngo, school, village, taluka, district, createdby, oid } = datavalues;
    try {
        if (datavalues["password"] === "") {
            const [results] = await pool.query("update user_profile set usergroup = ?, username = ?, email = ?, displayname = ?, ngo = ?, school = ?, village = ?, taluka = ?, district = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [usergroup, username, email, displayname, ngo, school, village, taluka, district, createdby, oid]);
            return { success: true, message: "Updated Records: " + results.affectedRows };
        }
        const [results] = await pool.query("update user_profile set usergroup = ?, username = ?, password = ?, email = ?, displayname = ?, ngo = ?, school = ?, village = ?, taluka = ?, district = ?, updatedby = ?, updatedtime = NOW() where oid = ?;", [usergroup, username, password, email, displayname, ngo, school, village, taluka, district, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const deleteUserprofile = async (oid) => {
    try {
        const [results] = await pool.query("UPDATE user_profile SET status = 0 WHERE oid = ?", [oid]);
        return { success: true, message: "Deleted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};
