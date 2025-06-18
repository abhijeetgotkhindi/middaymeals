
import { schoolList, getSchoolById, ngoSchoolList, insertSchool, updateSchool, deleteSchool } from '../services/schoolService.js';

// Function to get all users
export const getAllSchool = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await schoolList();
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

// Function to get all users
export const schoolListByID = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await getSchoolById(req.params.schooloid);
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

export const getAllNgoSchool = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await ngoSchoolList(req.params.useroid, req.params.ngooid);
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

export const addNewSchool = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertSchool(req.body);
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

export const updateSchoolRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateSchool(req.body);
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

export const deleteSchoolRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteSchool(req.body.oid);
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
