import Attendance from '../models/attendanceModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new attendance
// @route   POST /api/v1/attendances
// @access  Public
export const createAttendance = async (req, res) => {
    try {
        // make imgUrl from req.file
        const imgUrl = req.file ? req.file.path : null;

        // Create a new attendance
        const newAttendance = new Attendance({
            user: req.body.user, 
            type: req.body.type, 
            imgUrl
        });

        // Save the attendance to the database
        await newAttendance.save();

        console.log(`Attendance successfully created: ${newAttendance._id}`);
        res.status(201).json(newAttendance);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get today's attendance by operator
// @route   GET /api/v1/attendances/:id/today
// @access  Public
export const getTodayAttendanceByOperator = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendances = await Attendance.find({
            user: req.params.id,
            createdAt: {
                $gte: today
            }
        }).populate('user');
        
res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};