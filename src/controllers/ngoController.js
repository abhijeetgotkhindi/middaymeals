
import { ngoList, getNgoById,insertNgo,updateNgo,deleteNgo } from '../services/ngoService.js';

// Function to get all users
export const getAllNgo = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await ngoList();
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
export const NgoListByID = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await getNgoById(req.params.ngooid);
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

export const addNewNgo = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertNgo(req.body);
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

export const updateNgoRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateNgo(req.body);
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

export const deleteNgoRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteNgo(req.body.oid);
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
