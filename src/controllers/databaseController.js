
import { databaseValues } from '../services/databaseService.js';

// Function to get all users
export const getDatabase = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await databaseValues(req.params.tablename);
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
