
import { menuList } from '../services/menuService.js';

// Function to get all users
export const getMenu = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await menuList(req.params.groupoid);
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
