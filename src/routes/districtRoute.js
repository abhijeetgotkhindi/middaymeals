import express from 'express';
import { getAllDistrict, districtListByID, addNewDistrict, updateDistrictRecord, deleteDistrictRecord } from '../controllers/districtController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllDistrict);
router.get('/:districtoid', verifyToken, districtListByID);
router.post('/addnew', verifyToken, addNewDistrict);
router.put('/update', verifyToken, updateDistrictRecord);
router.delete('/delete', verifyToken, deleteDistrictRecord);

export default router;
