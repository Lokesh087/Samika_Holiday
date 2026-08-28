import express from 'express';
import { getAgencies } from '../controllers/agencyController.js';

const router = express.Router();

router.get('/', getAgencies);

export default router;
