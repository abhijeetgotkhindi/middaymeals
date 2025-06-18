// controllers/authController.js
import { loginUser, logoutUser } from '../services/authService.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'username and password are required' });
    }

    try {
        // Call loginUser function from auth service
        const response = await loginUser(username, password);        
        if (response.success) {
            res.cookie('token', response.token, {
                httpOnly: true,
                secure: false, // Use in production (HTTPS)
                sameSite: 'Lax', // or 'Lax'
                maxAge: process.env.MAX_AGE // 1 hour
              });
            return res.status(200).json(response); // Login successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Login failed. Please try again later.' 
        });
    }
};

export const logout = async (req, res) =>{
    try {  
        const token = req.headers.authorization?.split(' ')[1];
        const response = await logoutUser(token);  
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Lax',
          });
        return res.status(200).json({ 
            success: true, 
            message: 'Logout Successfully' 
        });
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed' 
        });
    }
};
