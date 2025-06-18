
import { userprofileList, userprofileListByIDList, insertUserprofile,updateUserprofile,deleteUserprofile } from '../services/userprofileService.js';

// Function to get all users
export const getAllUserprofile = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await userprofileList();
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

export const userprofileListByID = async (req, res) => {
  try {
    console.log(req.params.userprofileoid);
    // Call loginUser function from auth service
    const response = await userprofileListByIDList(req.params.userprofileoid);
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

export const addNewUserprofile = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertUserprofile(req.body);
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

export const updateUserprofileRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateUserprofile(req.body);
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

export const deleteUserprofileRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteUserprofile(req.body.oid);
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
