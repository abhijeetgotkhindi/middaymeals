
import { talukaList, talukaListByIDList, insertTaluka,updateTaluka,deleteTaluka } from '../services/talukaService.js';

// Function to get all users
export const getAllTaluka = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await talukaList();
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

export const talukaListByID = async (req, res) => {
  try {
    console.log(req.params.talukaoid);
    // Call loginUser function from auth service
    const response = await talukaListByIDList(req.params.talukaoid);
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

export const addNewTaluka = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertTaluka(req.body);
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

export const updateTalukaRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateTaluka(req.body);
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

export const deleteTalukaRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteTaluka(req.body.oid);
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
