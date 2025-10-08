import { pool, writeLog } from "../config/db.js";

export const mdmReport = async (datavalues) => {
    const { ngocode, date } = datavalues;
    try {
        //AND ngo IN (?) AND school IN (?)
        const [mdmReport] = await pool.query(`WITH RECURSIVE all_dates AS (
                                                SELECT DATE_FORMAT(STR_TO_DATE('${date}', '%M-%Y'), '%Y-%m-01') AS dt   -- first day of given month
                                                UNION ALL
                                                SELECT DATE_ADD(dt, INTERVAL 1 DAY)
                                                FROM all_dates
                                                WHERE dt < LAST_DAY(STR_TO_DATE('${date}', '%M-%Y'))   -- last day of given month
                                            )
                                            , daily AS (
                                                SELECT 
                                                    DATE_FORMAT(d.dt, '%d-%m-%Y') AS date,
                                            
                                                    -- Present counts
                                                    COALESCE(SUM(t.g1totalpresent), 0) AS g1totalpresent,
                                                    COALESCE(SUM(t.g2totalpresent), 0) AS g2totalpresent,
                                                    COALESCE(SUM(t.g3totalpresent), 0) AS g3totalpresent,
                                                    COALESCE(SUM(t.g4totalpresent), 0) AS g4totalpresent,
                                                    COALESCE(SUM(t.g1totalpresent + t.g2totalpresent + t.g3totalpresent + t.g4totalpresent), 0) AS sumoftotalpresent,
                                            
                                                    -- Hot meals
                                                    COALESCE(SUM(t.g1hotmeals), 0) AS g1hotmeals,
                                                    COALESCE(SUM(t.g2hotmeals), 0) AS g2hotmeals,
                                                    COALESCE(SUM(t.g3hotmeals), 0) AS g3hotmeals,
                                                    COALESCE(SUM(t.g4hotmeals), 0) AS g4hotmeals,
                                                    COALESCE(SUM(t.g1hotmeals + t.g2hotmeals + t.g3hotmeals + t.g4hotmeals), 0) AS sumoftotalhotmeals
                                                FROM all_dates d
                                                LEFT JOIN ${ngocode}_intent t 
                                                     ON DATE(t.intentfor) = d.dt
                                                GROUP BY d.dt
                                            )
                                            SELECT * 
                                            FROM daily
                                            
                                            UNION ALL
                                            
                                            -- Grand total row
                                            SELECT 
                                                'TOTAL' AS date,
                                                SUM(g1totalpresent), 
                                                SUM(g2totalpresent), 
                                                SUM(g3totalpresent), 
                                                SUM(g4totalpresent), 
                                                SUM(sumoftotalpresent),
                                                SUM(g1hotmeals),
                                                SUM(g2hotmeals),
                                                SUM(g3hotmeals),
                                                SUM(g4hotmeals),
                                                SUM(sumoftotalhotmeals)
                                            FROM daily
                                            
                                            ORDER BY 
                                                CASE WHEN date = 'TOTAL' THEN 2 ELSE 1 END, 
                                                date;
                                            `, []);
        if (mdmReport.length === 0) {
            return { success: true, message: 'Data not found', mdmReport: [] };
        }
        return {
            success: true, message: 'Data fetched successful', mdmReport: mdmReport
        };
    } catch (error) {
        writeLog(error);
        console.log(error)
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const milkReport = async (datavalues) => {
    const { ngocode, date } = datavalues;
    try {
        //AND ngo IN (?) AND school IN (?)
        const [milkReport] = await pool.query(`WITH RECURSIVE all_dates AS (
                                                SELECT DATE_FORMAT(STR_TO_DATE('${date}', '%M-%Y'), '%Y-%m-01') AS dt   -- first day of given month
                                                UNION ALL
                                                SELECT DATE_ADD(dt, INTERVAL 1 DAY)
                                                FROM all_dates
                                                WHERE dt < LAST_DAY(STR_TO_DATE('${date}', '%M-%Y'))   -- last day of given month
                                            )
                                            , daily AS (
                                                SELECT 
                                                    DATE_FORMAT(d.dt, '%d-%m-%Y') AS date,
                                            
                                                    -- Present counts
                                                    COALESCE(SUM(t.g1totalpresent), 0) AS g1totalpresent,
                                                    COALESCE(SUM(t.g2totalpresent), 0) AS g2totalpresent,
                                                    COALESCE(SUM(t.g3totalpresent), 0) AS g3totalpresent,
                                                    COALESCE(SUM(t.g4totalpresent), 0) AS g4totalpresent,
                                                    COALESCE(SUM(t.g1totalpresent + t.g2totalpresent + t.g3totalpresent + t.g4totalpresent), 0) AS sumoftotalpresent,
                                            
                                                    -- Hot meals
                                                    COALESCE(SUM(t.g1milk), 0) AS g1milk,
                                                    COALESCE(SUM(t.g2milk), 0) AS g2milk,
                                                    COALESCE(SUM(t.g3milk), 0) AS g3milk,
                                                    COALESCE(SUM(t.g4milk), 0) AS g4milk,
                                                    COALESCE(SUM(t.g1milk + t.g2milk + t.g3milk + t.g4milk), 0) AS sumoftotalmilk
                                                FROM all_dates d
                                                LEFT JOIN ${ngocode}_intent t 
                                                     ON DATE(t.intentfor) = d.dt
                                                GROUP BY d.dt
                                            )
                                            SELECT * 
                                            FROM daily
                                            
                                            UNION ALL
                                            
                                            -- Grand total row
                                            SELECT 
                                                'TOTAL' AS date,
                                                SUM(g1totalpresent), 
                                                SUM(g2totalpresent), 
                                                SUM(g3totalpresent), 
                                                SUM(g4totalpresent), 
                                                SUM(sumoftotalpresent),
                                                SUM(g1milk),
                                                SUM(g2milk),
                                                SUM(g3milk),
                                                SUM(g4milk),
                                                SUM(sumoftotalmilk)
                                            FROM daily
                                            
                                            ORDER BY 
                                                CASE WHEN date = 'TOTAL' THEN 2 ELSE 1 END, 
                                                date;
                                            `, []);
        if (milkReport.length === 0) {
            return { success: true, message: 'Data not found', milkReport: [] };
        }
        return {
            success: true, message: 'Data fetched successful', milkReport: milkReport
        };
    } catch (error) {
        writeLog(error);
        console.log(error)
        return { success: false, message: 'Failed. Please try again later.' };
    }
};

export const eggBananaReport = async (datavalues) => {
    const { ngocode, date } = datavalues;
    try {
        //AND ngo IN (?) AND school IN (?)
        const [eggBananaReport] = await pool.query(`WITH RECURSIVE all_dates AS (
                                    SELECT DATE_FORMAT(STR_TO_DATE('${date}', '%M-%Y'), '%Y-%m-01') AS dt   -- first day of given month
                                    UNION ALL
                                    SELECT DATE_ADD(dt, INTERVAL 1 DAY)
                                    FROM all_dates
                                    WHERE dt < LAST_DAY(STR_TO_DATE('${date}', '%M-%Y'))   -- last day of given month
                                ),
                                daily AS (
                                    SELECT 
                                        DATE_FORMAT(d.dt, '%d-%m-%Y') AS date,
                                
                                        -- Present counts
                                        COALESCE(SUM(t.g1totalpresent), 0) AS g1totalpresent,
                                        COALESCE(SUM(t.g2totalpresent), 0) AS g2totalpresent,
                                        COALESCE(SUM(t.g3totalpresent), 0) AS g3totalpresent,
                                        COALESCE(SUM(t.g4totalpresent), 0) AS g4totalpresent,
                                        COALESCE(SUM(t.g1totalpresent + t.g2totalpresent + t.g3totalpresent + t.g4totalpresent), 0) AS sumoftotalpresent,
                                
                                        -- Eggs
                                        COALESCE(SUM(t.g1egg), 0) AS g1egg,
                                        COALESCE(SUM(t.g2egg), 0) AS g2egg,
                                        COALESCE(SUM(t.g3egg), 0) AS g3egg,
                                        COALESCE(SUM(t.g4egg), 0) AS g4egg,
                                        COALESCE(SUM(t.g1egg + t.g2egg + t.g3egg + t.g4egg), 0) AS sumoftotalegg,
                                
                                        -- Bananas
                                        COALESCE(SUM(t.g1banana), 0) AS g1banana,
                                        COALESCE(SUM(t.g2banana), 0) AS g2banana,
                                        COALESCE(SUM(t.g3banana), 0) AS g3banana,
                                        COALESCE(SUM(t.g4banana), 0) AS g4banana,
                                        COALESCE(SUM(t.g1banana + t.g2banana + t.g3banana + t.g4banana), 0) AS sumoftotalbanana
                                
                                    FROM all_dates d
                                    LEFT JOIN  ${ngocode}_intent t 
                                           ON DATE(t.intentfor) = d.dt
                                    WHERE DATE_FORMAT(d.dt, '%M-%Y') = '${date}'
                                    GROUP BY d.dt
                                )
                                -- final output
                                SELECT * FROM daily
                                UNION ALL
                                SELECT 
                                    'TOTAL' AS date,
                                    SUM(g1totalpresent),
                                    SUM(g2totalpresent),
                                    SUM(g3totalpresent),
                                    SUM(g4totalpresent),
                                    SUM(sumoftotalpresent),
                                    SUM(g1egg),
                                    SUM(g2egg),
                                    SUM(g3egg),
                                    SUM(g4egg),
                                    SUM(sumoftotalegg),
                                    SUM(g1banana),
                                    SUM(g2banana),
                                    SUM(g3banana),
                                    SUM(g4banana),
                                    SUM(sumoftotalbanana)
                                FROM daily
                                ORDER BY 
                                    CASE WHEN date = 'TOTAL' THEN 2 ELSE 1 END,
                                    date;
                                `, []);
        if (eggBananaReport.length === 0) {
            return { success: true, message: 'Data not found', eggBananaReport: [] };
        }
        return {
            success: true, message: 'Data fetched successful', eggBananaReport: eggBananaReport
        };
    } catch (error) {
        writeLog(error);
        console.log(error)
        return { success: false, message: 'Failed. Please try again later.' };
    }
};
