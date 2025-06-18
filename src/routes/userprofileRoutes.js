import express from 'express';
import { getAllUserprofile, userprofileListByID, addNewUserprofile, updateUserprofileRecord, deleteUserprofileRecord } from '../controllers/userprofileController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllUserprofile);
router.get('/:userprofileoid', verifyToken, userprofileListByID);
router.post('/addnew', verifyToken, addNewUserprofile);
router.put('/update', verifyToken, updateUserprofileRecord);
router.delete('/delete', verifyToken, deleteUserprofileRecord);

export default router;
