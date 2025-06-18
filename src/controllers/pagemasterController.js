
import { pagemasterList, pagemasterListByIDList, insertPagemaster,updatePagemaster,deletePagemaster } from '../services/pagemasterService.js';

// Function to get all users
export const getAllPagemaster = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await pagemasterList();
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

export const pagemasterListByID = async (req, res) => {
  try {
    console.log(req.params.pagemasteroid);
    // Call loginUser function from auth service
    const response = await pagemasterListByIDList(req.params.pagemasteroid);
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

export const addNewPagemaster = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertPagemaster(req.body);
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

export const updatePagemasterRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updatePagemaster(req.body);
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

export const deletePagemasterRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deletePagemaster(req.body.oid);
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
