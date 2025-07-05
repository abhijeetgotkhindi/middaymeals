
import { routeList, routeListByIDList, insertRoute,updateRoute,deleteRoute } from '../services/routeService.js';

// Function to get all users
export const getAllRoute = async (req, res) => {
  try {
    // Call loginUser function from auth service
    const response = await routeList();
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

export const routeListByID = async (req, res) => {
  try {
    console.log(req.params.routeoid);
    // Call loginUser function from auth service
    const response = await routeListByIDList(req.params.routeoid);
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

export const addNewRoute = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await insertRoute(req.body);
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

export const updateRouteRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await updateRoute(req.body);
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

export const deleteRouteRecord = async (req, res) => {
    try {
        // Call loginUser function from auth service
        const response = await deleteRoute(req.body.oid);
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
