import express from 'express';
import { createAttendance, getTodayAttendanceByOperator} from '../controllers/attendanceController.js';

const router = express.Router();

// Create attendance
router.post('/', createAttendance);

// Get operator outlet by Id
router.get('/:id/today', getTodayAttendanceByOperator);

export default router;