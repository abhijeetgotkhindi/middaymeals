import express from 'express';
import { getMenu } from '../controllers/menuController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
import { verifyUserAccess } from '../middleware/userAccessMiddleware.js'
const router = express.Router();

router.get('/:groupoid', verifyToken, getMenu);

export default router;
