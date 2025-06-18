import express from 'express';
import { getAllIntent, addNewIntent, updateIntentRecord, deleteIntentRecord, updateIntentRecordStatus } from '../controllers/intentController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();
router.get('/:ngooid', verifyToken, getAllIntent);
router.post('/:ngooid/addnew', verifyToken, addNewIntent);
router.put('/:ngooid/update', verifyToken, updateIntentRecord);
router.put('/:ngooid/updatestatus', verifyToken, updateIntentRecordStatus);
router.delete('/:ngooid/delete', verifyToken, deleteIntentRecord);

export default router;
