
import { holidayList, insertHoliday, updateHoliday, deleteHoliday, ngoschoolholidayList } from '../services/holidayService.js';

// Function to get all users
export const getAllHoliday = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await holidayList();
        if (response.success) {
            return res.status(200).json(response); // Login successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed. Please try again later.'
        });
    }
};

export const getngoschoolholidayList = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await ngoschoolholidayList(req.params.ngooid);
        if (response.success) {
            return res.status(200).json(response); // Login successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed. Please try again later.'
        });
    }
};

export const addNewHoliday = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertHoliday(req.body);
        if (response.success) {
            return res.status(200).json(response); // Login successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: error
        });
    }
};

export const updateHolidayRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateHoliday(req.body);
        if (response.success) {
            return res.status(200).json(response); // successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: error
        });
    }
};

export const deleteHolidayRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteHoliday(req.body.oid);
        if (response.success) {
            return res.status(200).json(response); // successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: error
        });
    }
};
