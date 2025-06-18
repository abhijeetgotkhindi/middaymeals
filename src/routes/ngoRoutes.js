import express from 'express';
import { getAllNgo, NgoListByID, addNewNgo, updateNgoRecord, deleteNgoRecord } from '../controllers/ngoController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllNgo);
router.get('/:ngooid', verifyToken, NgoListByID);
router.post('/addnew', verifyToken, addNewNgo);
router.put('/update', verifyToken, updateNgoRecord);
router.delete('/delete', verifyToken, deleteNgoRecord);

export default router;
