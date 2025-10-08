import express from 'express';
import { getMdmReport, getMilkReport, getEggBananaReport } from '../controllers/reportsController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.post('/mdmreport', verifyToken, getMdmReport);
router.post('/milkreport', verifyToken, getMilkReport);
router.post('/eggbananareport', verifyToken, getEggBananaReport);

export default router;