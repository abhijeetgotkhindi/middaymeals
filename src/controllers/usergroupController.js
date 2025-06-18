
import { usergroupList, usergroupListByIDList, insertUsergroup,updateUsergroup,deleteUsergroup } from '../services/usergroupService.js';

// Function to get all users
export const getAllUsergroup = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await usergroupList();
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

export const usergroupListByID = async (req, res) => {
  try {
    console.log(req.params.usergroupoid);
    // Call loginUser function from auth service
    const response = await usergroupListByIDList(req.params.usergroupoid);
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

export const addNewUsergroup = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertUsergroup(req.body);
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

export const updateUsergroupRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateUsergroup(req.body);
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

export const deleteUsergroupRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteUsergroup(req.body.oid);
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
