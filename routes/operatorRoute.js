import express from 'express';
import { getOperatorOutletById} from '../controllers/operatorController.js';

const router = express.Router();

// Get operator outlet by Id
router.get('/:id/outlet', getOperatorOutletById);

export default router;