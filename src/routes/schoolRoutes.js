import express from 'express';
import { getAllSchool, schoolListByID, getAllNgoSchool, addNewSchool, updateSchoolRecord, deleteSchoolRecord } from '../controllers/schoolController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllSchool);
router.get('/:schooloid', verifyToken, schoolListByID);
router.get('/:useroid/:ngooid', verifyToken, getAllNgoSchool);
router.post('/addnew', verifyToken, addNewSchool);
router.put('/update', verifyToken, updateSchoolRecord);
router.delete('/delete', verifyToken, deleteSchoolRecord);


export default router;
