import { pool } from "../config/db.js";

export const databaseValues = async (tablename) => {
    try {
        const [databaseValues] = await pool.query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_KEY, EXTRA, COLUMN_COMMENT
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE();`,[tablename]);
        if (databaseValues.length === 0) {
            return { success: false, message: 'Data not found' };
        }
        return {
            success: true,
            message: 'Data fetched successful',
            databaseValues: databaseValues
        };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: 'Failed. Please try again later.' };
    }
};
