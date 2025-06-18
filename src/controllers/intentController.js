import { intentList, insertIntent, updateIntent, deleteIntent, updateIntentStatus } from '../services/intentService.js';

// Function to get all users
export const getAllIntent = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await intentList(req.params.ngooid);
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

export const addNewIntent = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertIntent(req.body, req.params.ngooid);
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

export const updateIntentRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateIntent(req.body, req.params.ngooid);
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

export const updateIntentRecordStatus = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateIntentStatus(req.body, req.params.ngooid);
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

export const deleteIntentRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteIntent(req.body.oid, req.params.ngooid);
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
