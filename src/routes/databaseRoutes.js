import express from 'express';
import { getDatabase } from '../controllers/databaseController.js';
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";
const router = express.Router();

router.get('/:tablename', verifyToken, getDatabase);

export default router;
