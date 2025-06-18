import express from 'express';
import { getAllPagemaster, pagemasterListByID, addNewPagemaster, updatePagemasterRecord, deletePagemasterRecord } from '../controllers/pagemasterController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllPagemaster);
router.get('/:pagemasteroid', verifyToken, pagemasterListByID);
router.post('/addnew', verifyToken, addNewPagemaster);
router.put('/update', verifyToken, updatePagemasterRecord);
router.delete('/delete', verifyToken, deletePagemasterRecord);

export default router;
