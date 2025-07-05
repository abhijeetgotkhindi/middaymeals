import express from 'express';
import { getAllRoute, routeListByID, addNewRoute, updateRouteRecord, deleteRouteRecord } from '../controllers/routeController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/', verifyToken, getAllRoute);
router.get('/:routeoid', verifyToken, routeListByID);
router.post('/addnew', verifyToken, addNewRoute);
router.put('/update', verifyToken, updateRouteRecord);
router.delete('/delete', verifyToken, deleteRouteRecord);

export default router;
