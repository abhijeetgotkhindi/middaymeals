import express from 'express';
import { getAllTaluka, talukaListByID, addNewTaluka, updateTalukaRecord, deleteTalukaRecord } from '../controllers/talukaController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllTaluka);
router.get('/:talukaoid', verifyToken, talukaListByID);
router.post('/addnew', verifyToken, addNewTaluka);
router.put('/update', verifyToken, updateTalukaRecord);
router.delete('/delete', verifyToken, deleteTalukaRecord);

export default router;
