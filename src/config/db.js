//Add your database
import mysql2 from 'mysql2/promise';
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database Connection Successfull!!");
        connection.release();

    } catch (error) {
        console.log("Error connecting to database!");
        throw error;

    }
}

const writeLog = (message, level = 'INFO') => {
    const logDir = path.join(path.join(process.cwd() + "/src"), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }


    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;

    const logFilePath = path.join(logDir, 'app.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

export { pool, checkConnection, writeLog };