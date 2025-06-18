
import { districtList, getDistrictById, insertDistrict,updateDistrict,deleteDistrict } from '../services/districtService.js';

// Function to get all users
export const getAllDistrict = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await districtList();
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

export const districtListByID = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await getDistrictById(req.params.districtoid);
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

export const addNewDistrict = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertDistrict(req.body);
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

export const updateDistrictRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateDistrict(req.body);
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

export const deleteDistrictRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteDistrict(req.body.oid);
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
