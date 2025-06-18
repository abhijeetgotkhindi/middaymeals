import express from 'express';
import { getAllUsergroup, usergroupListByID, addNewUsergroup, updateUsergroupRecord, deleteUsergroupRecord } from '../controllers/usergroupController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllUsergroup);
router.get('/:usergroupoid', verifyToken, usergroupListByID);
router.post('/addnew', verifyToken, addNewUsergroup);
router.put('/update', verifyToken, updateUsergroupRecord);
router.delete('/delete', verifyToken, deleteUsergroupRecord);

export default router;
