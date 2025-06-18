
import { villageList, villageListByIDList, insertVillage,updateVillage,deleteVillage } from '../services/villageService.js';

// Function to get all users
export const getAllVillage = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await villageList();
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

export const villageListByID = async (req, res) => {
  try {
    console.log(req.params.villageoid);
    // Call loginUser function from auth service
    const response = await villageListByIDList(req.params.villageoid);
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

export const addNewVillage = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertVillage(req.body);
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

export const updateVillageRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateVillage(req.body);
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

export const deleteVillageRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteVillage(req.body.oid);
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
