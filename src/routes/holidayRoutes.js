import express from 'express';
import { getAllHoliday, addNewHoliday, updateHolidayRecord, deleteHolidayRecord, getngoschoolholidayList } from '../controllers/holidayController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllHoliday);
router.get('/:ngooid', verifyToken, getngoschoolholidayList);
router.post('/addnew', verifyToken, addNewHoliday);
router.put('/update', verifyToken, updateHolidayRecord);
router.delete('/delete', verifyToken, deleteHolidayRecord);

export default router;
