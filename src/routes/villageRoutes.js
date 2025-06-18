import express from 'express';
import { getAllVillage, villageListByID, addNewVillage, updateVillageRecord, deleteVillageRecord } from '../controllers/villageController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllVillage);
router.get('/:villageoid', verifyToken, villageListByID);
router.post('/addnew', verifyToken, addNewVillage);
router.put('/update', verifyToken, updateVillageRecord);
router.delete('/delete', verifyToken, deleteVillageRecord);

export default router;
