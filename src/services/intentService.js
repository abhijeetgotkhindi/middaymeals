import { pool } from "../config/db.js";
import { v6 as uuidv6 } from 'uuid';

export const intentList = async (ngooid) => {
    try {
        const [intent] = await pool.query(`SELECT  i.oid as intentrow,i.oid,DATE_FORMAT(intentfor,'%a %d-%m-%Y') AS intentfor,schoolname , school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total,m.value2 as istatus,DATE_FORMAT(i.creationtime,'%h:%i %p') as creationtime,m.value,CASE 
    WHEN i.updatedtime IS NOT NULL AND i.updatedtime > i.creationtime THEN i.updatedtime
    ELSE i.creationtime
  END AS createdDate FROM ` + ngooid + `_intent i
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
         if (datavalues['istatus'] == -1)
            datavalues['drafttime'] = new Date();
        else
            datavalues['submittedtime'] = new Date()
        const columns = Object.keys(datavalues);
        const placeholders = columns.map(() => '?').join(', ');
        const values = Object.values(datavalues);
        const query = `INSERT INTO ${ngooid}_intent (${columns.join(', ')}) VALUES (${placeholders})`;
        const [results] = await pool.query(query, values);
        // console.log(datavalues);
        // return false;
        // const [results] = await pool.query("INSERT INTO " + ngooid + "_intent (" + Object.keys(datavalues) + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Object.values(datavalues));
        return { success: true, message: "Inserted Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateIntent = async (datavalues, ngooid) => {
    
    if(istatus == 2)
       datavalues['updationTime'] = "deliveredtime = " + new Date()
    else if(istatus == 3)
       datavalues['updationTime'] = "receivedtime = " + new Date()
       
    const { intentfor, school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total, istatus, createdby, oid } = datavalues;

    try {
        const [results] = await pool.query("update " + ngooid + "_intent set intentfor = ?, school = ?, totalreg = ?, totalpresent = ?, milk = ?, rice = ?, sambar = ?, egg = ?, shengachikki = ?, banana = ?, total = ?, istatus = ?, updatedby = ?, updatedtime = NOW() " + datavalues['updationTime'] + " where oid = ?;", [intentfor, school, totalreg, totalpresent, milk, rice, sambar, egg, shengachikki, banana, total, istatus, createdby, oid]);
        return { success: true, message: "Updated Records: " + results.affectedRows };
    } catch (error) {
        return { success: false, message: "Error: " + error.sqlMessage };
    }
};

export const updateIntentStatus = async (datavalues, ngooid) => {
  const { oid } = datavalues;
  const oids = oid.split(',').map(id => id.trim());

  // Clone object to avoid modifying original
  const updateFields = { ...datavalues };

  // Handle timestamps based on istatus
  if (updateFields.istatus === 2) {
    updateFields.deliveredtime = new Date();
  } else if (updateFields.istatus === 3) {
    updateFields.receivedtime = new Date();
  }

  // Always update updatedtime
  updateFields.updatedtime = new Date();

  // Remove `oid` from fields being updated
  delete updateFields.oid;

  const keys = Object.keys(updateFields); // e.g. ['istatus', 'createdby', 'deliveredtime', 'updatedtime']
  const values = Object.values(updateFields); // Corresponding values

  // Build SET clause like "istatus = ?, createdby = ?, deliveredtime = ?, updatedtime = ?"
  const setClause = keys.map(key => `${key} = ?`).join(', ');

  try {
    const query = `UPDATE ${ngooid}_intent SET ${setClause} WHERE oid IN (?);`;
    const [results] = await pool.query(query, [...values, oids]);
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
