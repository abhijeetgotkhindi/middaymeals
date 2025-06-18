import React from 'react'
import { pool } from "../config/db.js";

export const verifyUserAccess = async (req, res, next) => {
    const [rows]= await pool.query('SELECT ug.pageaccess FROM user_profile up inner join usergroup ug on (up.usergroup = ug.oid) where up.oid =  ?', [1]);
    const hasValue = (obj, value) => Object.values(rows).includes(value);

console.log(hasValue(rows, 10));
console.log(hasValue);
next();
}
