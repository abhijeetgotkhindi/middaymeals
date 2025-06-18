import { pool } from "../config/db.js";

export const menuList = async (groupoid) => {
    try {
        const [menu] = await pool.query('select pm.oid as mainpageoid, pm.filename,pm.icon,pm.parent,pm.title ,(select GROUP_CONCAT(oid) from pagemaster where parent = pm.oid order by sort) as submenu ,(select GROUP_CONCAT(filename) from pagemaster where parent = pm.oid order by sort) as submenufilename ,(select GROUP_CONCAT(title) from pagemaster where parent = pm.oid order by sort) as submenutitle ,(select GROUP_CONCAT(icon) from pagemaster where parent = pm.oid order by sort) as submenuicon from pagemaster pm inner join usergroup ug on FIND_IN_SET(pm.oid, ug.pageaccess) where ug.oid = ? and pm.parent= 0 group by pm.oid order by pm.oid,pm.sort;', [groupoid]);
        if (menu.length === 0) {
            return { success: true, message: 'Data not found', menu: [] };
        }
        return { success: true, message: 'Data fetched successful', menu: menu };
    } catch (error) {
        return { success: false, message: 'Failed. Please try again later.' };
    }
};
