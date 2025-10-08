
import { mdmReport, milkReport, eggBananaReport } from '../services/reportsService.js';

export const getMdmReport = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await mdmReport(req.body);
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

export const getMilkReport = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await milkReport(req.body);
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

export const getEggBananaReport = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await eggBananaReport(req.body);
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
